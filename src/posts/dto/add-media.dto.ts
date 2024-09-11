import { ApiProperty } from '@nestjs/swagger';

export class AddMediaDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  media: Array<any>;
}
