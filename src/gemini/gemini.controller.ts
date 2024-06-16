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
import {
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MessageResponse } from './gemini.entity';

@ApiTags('Cuss Words Detection')
@Controller()
export class GeminiController {
  constructor(private geminiService: GeminiService) {}

  @Get()
  @ApiOperation({
    summary: 'Check cuss word using `GET` request.',
    description: 'Returns object of type `MessageResponse`.',
  })
  @ApiResponse({
    status: 200,
    description: 'Pong',
    type: MessageResponse,
  })
  async checkText(@Query('prompt') prompt: string): Promise<MessageResponse> {
    return await this.geminiService.checkCussWord(prompt);
  }

  @Post()
  @ApiOperation({
    summary: 'Check cuss word using `POST` request.',
    description: 'Returns object of type `MessageResponse`.',
  })
  @ApiResponse({
    status: 200,
    description: 'Pong',
    type: MessageResponse,
  })
  async checkBodyText(@Body() body: MessageBody): Promise<MessageResponse> {
    const result = await this.geminiService.checkCussWord(body.text); // Would prolly fail if the connection is bad, if it fails then it would raise a 500 status code which should be handled.

    return result;
  }
}
