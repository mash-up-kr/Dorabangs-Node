import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from '@src/infrastructure';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async createPost(
    userId: string,
    folderId: string,
    url: string,
    title: string,
  ): Promise<boolean> {
    try {
      await this.postModel.create({
        folderId: folderId,
        url: url,
        title: title,
        userId: userId,
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException('create post DB error');
    }
  }

  async getPostCountByFolderIds(folderIds: Types.ObjectId[]) {
    const posts = await this.postModel
      .aggregate<{ _id: Types.ObjectId; count: number }>([
        {
          $match: {
            folderId: { $in: folderIds },
          },
        },
        {
          $group: {
            _id: '$folderId',
            count: { $sum: 1 },
          },
        },
      ])
      .exec();

    return posts;
  }

  async getCountByFolderId(folderId: string) {
    const count = await this.postModel.countDocuments({ folderId });

    return count;
  }

  async findByFolderId(folderId: string, offset: number, limit: number) {
    const folders = await this.postModel
      .find({ folderId })
      .skip(offset)
      .limit(limit);

    return folders;
  }
}
