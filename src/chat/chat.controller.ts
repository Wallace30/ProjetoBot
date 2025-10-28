import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatRequestDto } from './dto/chat-request.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async handleChat(
    @Body(new ValidationPipe()) chatRequest: ChatRequestDto,
  ) {
    const userMessage = chatRequest.message;
    
    const geminiResponse = await this.chatService.generateResponse(userMessage);

    return {
      response: geminiResponse,
    };
  }
}