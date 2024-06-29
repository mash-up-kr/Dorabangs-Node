import { ApiProperty } from '@nestjs/swagger';
import { FolderDocument } from '@src/infrastructure';
import { FolderType } from '@src/infrastructure/database/types/folder-type.enum';

export class FolderSummaryResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: FolderType })
  type: FolderType;

  @ApiProperty()
  createdAt: Date;

  constructor(data: FolderDocument) {
    this.id = data._id.toString();
    this.name = data.name;
    this.type = data.type;
    this.createdAt = data.createdAt;
  }
}
