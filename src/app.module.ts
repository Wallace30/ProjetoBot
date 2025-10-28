// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Importe
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module'; // Vamos criar isso

@Module({
  imports: [
    // Configure o módulo para ser global e carregar o .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ChatModule, // Adicione o módulo de chat
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}