import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema, Post, PostSchema } from '@src/infrastructure';
import { FolderRepository } from './folders.repository';
import { PostsRepository } from '../posts/posts.repository';
import { PostsService } from '../posts/posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Folder.name, schema: FolderSchema },
    ]),
  ],
  controllers: [FoldersController],
  providers: [FoldersService, PostsService, FolderRepository, PostsRepository],
})
export class FoldersModule {}
