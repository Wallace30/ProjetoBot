"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ChatService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const generative_ai_1 = require("@google/generative-ai");
let ChatService = ChatService_1 = class ChatService {
    configService;
    logger = new common_1.Logger(ChatService_1.name);
    model;
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('GOOGLE_API_KEY');
        if (!apiKey) {
            throw new Error('Chave de API do Google não encontrada no .env');
        }
        const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        this.model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
        });
    }
    async generateResponse(prompt) {
        this.logger.log(`Enviando prompt: "${prompt}"`);
        try {
            const safetySettings = [
                { category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
                { category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            ];
            const result = await this.model.generateContent({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                safetySettings,
            });
            const responseText = result.response.text();
            this.logger.log('Resposta recebida do Gemini.');
            return responseText;
        }
        catch (error) {
            this.logger.error('Erro ao chamar a API do Gemini', error);
            throw new common_1.InternalServerErrorException('Falha ao comunicar com a IA.');
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = ChatService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ChatService);
//# sourceMappingURL=chat.service.js.map