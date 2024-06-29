import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { Folder, FolderDocument } from '@src/infrastructure';
import { FolderType } from '@src/infrastructure/database/types/folder-type.enum';

@Injectable()
export class FolderRepository {
  constructor(
    @InjectModel(Folder.name)
    private readonly folderModel: Model<Folder>,
  ) {}

  async create(userId: string, name: string, type: FolderType) {
    const folder = await this.folderModel.create({
      userId,
      name,
      type,
    });

    return folder;
  }

  async findByUserId(userId: string) {
    const folders = await this.folderModel.find({ userId }).exec();
    return folders;
  }

  async findOneOrFail(param: FilterQuery<FolderDocument>) {
    const folder = await this.folderModel.findOne(param).exec();
    if (!folder) {
      throw new NotFoundException('folder not found');
    }

    return folder;
  }
}
