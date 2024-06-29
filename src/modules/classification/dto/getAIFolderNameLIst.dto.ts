import { ApiProperty } from '@nestjs/swagger';
import { FolderDocument } from '@src/infrastructure';
import { IsNotEmpty, IsString } from 'class-validator';

export class AIFolderNameServiceDto {
  @ApiProperty({ description: '폴더 id' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: '폴더 이름' })
  @IsNotEmpty()
  @IsString()
  name: string;

  constructor(data: FolderDocument) {
    (this.id = data._id.toString()), (this.name = data.name);
  }
}

export class AIFolderNameListResponse {
  @ApiProperty({
    type: AIFolderNameServiceDto,
    isArray: true,
  })
  list: AIFolderNameServiceDto[];

  constructor(data: AIFolderNameServiceDto[]) {
    this.list = data;
  }
}
