import { ApiProperty } from '@nestjs/swagger';
import { FolderSummaryResponse } from './folder-summary.response';
import { Types } from 'mongoose';
import { FolderDocument } from '@src/infrastructure';
import { FolderWithCount } from '../dto/folder-with-count.dto';

export class FolderResponse extends FolderSummaryResponse {
  @ApiProperty()
  postCount: number;

  constructor(data: FolderWithCount) {
    super(data);

    this.postCount = data.postCount;
  }
}
