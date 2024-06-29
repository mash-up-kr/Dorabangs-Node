import { Injectable, NotFoundException } from '@nestjs/common';
import { MutateFolderDto } from './dto/mutate-folder.dto';
import { Types } from 'mongoose';
import { FolderWithCount } from './dto/folder-with-count.dto';
import { FolderRepository } from './folders.repository';
import { PostsRepository } from '../posts/posts.repository';
import { FolderType } from '@src/infrastructure/database/types/folder-type.enum';

@Injectable()
export class FoldersService {
  constructor(
    private readonly folderRepository: FolderRepository,
    private readonly postRepository: PostsRepository,
  ) {}

  async create(userId: string, createFolderDto: MutateFolderDto) {
    const folder = await this.folderRepository.create(
      userId,
      createFolderDto.name,
      FolderType.CUSTOM,
    );

    return folder;
  }

  async findAll(userId: string): Promise<FolderWithCount[]> {
    const folders = await this.folderRepository.findByUserId(userId);
    const folderIds = folders.map((folder) => folder._id);

    const posts = await this.postRepository.getPostCountByFolderIds(folderIds);

    const foldersWithCounts = folders.map((folder) => {
      const post = posts.find((post) => post._id.equals(folder._id));
      return {
        ...folder.toJSON(),
        postCount: post?.count ?? 0,
      } satisfies FolderWithCount;
    });

    return foldersWithCounts;
  }

  async findOne(userId: string, folderId: string) {
    const folder = await this.folderRepository.findOneOrFail({
      _id: folderId,
      userId,
    });

    return folder;
  }

  async update(
    userId: string,
    folderId: string,
    updateFolderDto: MutateFolderDto,
  ) {
    const folder = await this.folderRepository.findOneOrFail({
      _id: folderId,
      userId,
    });

    folder.name = updateFolderDto.name;
    await folder.save();
  }

  async remove(userId: string, folderId: string) {
    const folder = await this.folderRepository.findOneOrFail({
      userId,
      _id: folderId,
    });

    await folder.deleteOne().exec();
  }
}
