import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatService], // ✅ necessário para o AppModule enxergar
})
export class ChatModule {}
