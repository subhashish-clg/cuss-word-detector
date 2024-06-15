import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { MessageBody } from './dto';

@Controller()
export class GeminiController {
  constructor(private geminiService: GeminiService) {}

  @Get()
  async checkText(@Query('prompt') prompt: string): Promise<string> {
    return await this.geminiService.checkCussWord(prompt);
  }

  @Post()
  async checkBodyText(@Body() body: MessageBody) {
    const result = await this.geminiService.checkCussWord(body.text); // Would prolly fail if the connection is bad, if it fails then it would raise a 500 status code which should be handled.

    return result;
  }
}
