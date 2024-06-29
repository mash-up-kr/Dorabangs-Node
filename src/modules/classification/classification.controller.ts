import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { GetUser } from '@src/common';
import {
  ClassificationControllerDocs,
  GetAIFolderNameListDocs,
  GetAIPostListDocs,
} from './docs';
import { JwtGuard } from '../users/guards';

import { Types } from 'mongoose';
import { AIPostListResponse } from './dto/getAIPostList.dto';
import { AIFolderNameListResponse } from './dto/getAIFolderNameLIst.dto';

@Controller('ai')
@UseGuards(JwtGuard)
@ClassificationControllerDocs
export class ClassificationController {
  constructor(private readonly classificationService: ClassificationService) {}

  @Get('/suggestions') //TODO : 정렬
  @GetAIFolderNameListDocs
  async getSuggestedFolderNameList(@GetUser('id') userId: Types.ObjectId) {
    const folderNames =
      await this.classificationService.getFolderNameList(userId);

    return new AIFolderNameListResponse(folderNames);
  }

  @Get('/suggestions/:folderId')
  @GetAIPostListDocs
  async getSuggestedPostList(@Param('folderId') folderId: string) {
    const posts = await this.classificationService.getPostList(folderId);

    return new AIPostListResponse(posts);
  }
}
