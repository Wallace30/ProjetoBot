import { ChatService } from './chat.service';
import { ChatRequestDto } from './dto/chat-request.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    handleChat(chatRequest: ChatRequestDto): Promise<{
        response: string;
    }>;
}
