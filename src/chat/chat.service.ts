// src/chat/chat.service.ts
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GoogleGenerativeAI,
  GenerativeModel,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private model: GenerativeModel;

  constructor(private readonly configService: ConfigService) {
    // Pega a chave de API do .env
    const apiKey = this.configService.get<string>('GOOGLE_API_KEY');
    if (!apiKey) {
      throw new Error('Chave de API do Google não encontrada no .env');
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    
    this.model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });
  }

  async generateResponse(prompt: string): Promise<string> {
    this.logger.log(`Enviando prompt: "${prompt}"`);

    try {
      // Configurações (opcional, mas bom para segurança
      const safetySettings = [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      ];

      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        safetySettings,
      });

      const responseText = result.response.text();
      this.logger.log('Resposta recebida do Gemini.');
      return responseText;

    } catch (error) {
      this.logger.error('Erro ao chamar a API do Gemini', error);
      throw new InternalServerErrorException('Falha ao comunicar com a IA.');
    }
  }
}