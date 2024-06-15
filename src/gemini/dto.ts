import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MessageBody {
  @IsNotEmpty({ message: 'Text should not be empty.' })
  @IsString({ message: 'Text should be valid.' })
  @ApiProperty()
  text: string;
}
