import { Injectable } from '@nestjs/common';
import { Folder, FolderDocument, PostAIClassification } from '@src/schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ClassificationService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
    @InjectModel(PostAIClassification.name)
    private postAiClassificationModel: Model<PostAIClassification>,
  ) {}

  async getFolderNameList(userId: Types.ObjectId): Promise<FolderDocument[]> {
    const folders = await this.folderModel.find({ userId }).exec();
    const folderIds = folders.map((folder) => folder._id);

    const classifications = await this.postAiClassificationModel
      .find({ suggestedFolderId: { $in: folderIds } })
      .exec();

    const uniqueFolderIds = [
      ...new Set(
        classifications.map((classification) =>
          classification.suggestedFolderId.toString(),
        ),
      ),
    ];

    const matchedFolders = await this.folderModel
      .find({ _id: { $in: uniqueFolderIds } })
      .exec();

    return matchedFolders;
  }
}
