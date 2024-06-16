import { ApiProperty } from '@nestjs/swagger';

export class PingResponse {
  @ApiProperty({ example: 'success' })
  message: string;

  @ApiProperty({ example: 200, description: 'The ping was successful.' })
  status: number;
}
