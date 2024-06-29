import { ApiProperty } from '@nestjs/swagger';
import { FolderResponse } from './folder.response';
import { FolderWithCount } from '../dto/folder-with-count.dto';
import { FolderType } from '@src/infrastructure/database/types/folder-type.enum';

export class FolderListResponse {
  @ApiProperty({ isArray: true, type: FolderResponse })
  defaultFolders: FolderResponse[];

  @ApiProperty({ isArray: true, type: FolderResponse })
  customFolders: FolderResponse[];

  constructor(data: FolderWithCount[]) {
    this.defaultFolders = data
      .filter((folder) => folder.type === FolderType.DEFAULT)
      .map((folder) => new FolderResponse(folder));

    this.customFolders = data
      .filter((folder) => folder.type === FolderType.CUSTOM)
      .map((folder) => new FolderResponse(folder));
  }
}
