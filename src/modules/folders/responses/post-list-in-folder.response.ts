import { ApiProperty } from '@nestjs/swagger';
import { FolderResponse } from './folder.response';
import { PostResponse } from './post.response';
import { PostDocument } from '@src/infrastructure';
import { PaginationMetadata } from '@src/common';

export class PostListInFolderResponse extends PaginationMetadata {
  @ApiProperty({ type: PostResponse, isArray: true })
  list: PostResponse[];

  constructor(
    page: number,
    limit: number,
    total: number,
    list: PostDocument[],
  ) {
    super(page, limit, total);

    this.list = list.map((post) => new PostResponse(post));
  }
}
