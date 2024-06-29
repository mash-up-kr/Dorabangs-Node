import { Module } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Folder,
  FolderSchema,
  Post,
  PostAIClassification,
  PostAIClassificationSchema,
  PostSchema,
} from '@src/infrastructure/database/schema';

import { ClassificationController } from './classification.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Folder.name, schema: FolderSchema },
      { name: PostAIClassification.name, schema: PostAIClassificationSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [ClassificationController],
  providers: [ClassificationService],
})
export class ClassificationModule {}
