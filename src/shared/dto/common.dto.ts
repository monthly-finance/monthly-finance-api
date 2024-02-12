import { ApiProperty } from '@nestjs/swagger';

export class MFHeader {
  @ApiProperty({ example: '333a9149-40a2-4cbb-9476-2441fe05e122' })
  userid: string;
}
