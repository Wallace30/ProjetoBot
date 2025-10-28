import { ConfigService } from '@nestjs/config';
export declare class ChatService {
    private readonly configService;
    private readonly logger;
    private model;
    constructor(configService: ConfigService);
    generateResponse(prompt: string): Promise<string>;
}
