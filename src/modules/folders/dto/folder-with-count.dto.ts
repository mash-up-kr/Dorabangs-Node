import { FolderDocument } from '@src/infrastructure';

export interface FolderWithCount extends FolderDocument {
  postCount: number;
}
