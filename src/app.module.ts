import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeminiService } from './gemini/gemini.service';
import { GeminiController } from './gemini/gemini.controller';

@Module({
  imports: [],
  controllers: [AppController, GeminiController],
  providers: [AppService, GeminiService],
})
export class AppModule {}
