import { ApiProperty } from '@nestjs/swagger';

export class CussWord {
  word: string;
  start_index: number;
  end_index: number;
}

export class MessageResponse {
  @ApiProperty({
    example: 'Hello world',
    description: 'The text you want to check for cuss words.',
  })
  text: string;

  @ApiProperty({
    example: false,
    description: 'Shows if the text inlcudes cuss words.',
  })
  cuss_word_detected: boolean;

  @ApiProperty({
    example: null,
    description:
      'Array of cuss with their `start_index` and `end_index`, null if text does not include any cuss word.',
    type: CussWord,
  })
  cusswords: CussWord[];
}
