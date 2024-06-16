import { Controller, Get, HttpStatus, Post, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PingResponse } from './app.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  @ApiTags('Ping')
  @ApiOperation({
    summary: 'Ping the server',
    description: 'Check if the server is active.',
  })
  @ApiResponse({
    status: 200,
    description: 'Pong',
    type: PingResponse,
  })
  ping() {
    return {
      message: 'success',
      statusCode: HttpStatus.OK,
    };
  }
}
