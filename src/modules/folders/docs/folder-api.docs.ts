import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  FolderListResponse,
  FolderResponse,
  FolderSummaryResponse,
  PostListInFolderResponse,
} from '../responses';
import { GetPostQueryDto } from '@src/modules/posts/dto/find-in-folder.dto';

export const CreateFolderDocs = applyDecorators(
  ApiOperation({
    summary: '폴더 생성 API',
  }),
  ApiResponse({
    type: FolderSummaryResponse,
  }),
);

export const FindAFolderListDocs = applyDecorators(
  ApiOperation({
    summary: '내 폴더 목록 조회',
    description:
      'defaultFolders에는 자동으로 생성되는 폴더, customFolders에는 유저가 생성한 폴더들이 감',
  }),
  ApiResponse({
    type: FolderListResponse,
  }),
);

export const FindFolderDocs = applyDecorators(
  ApiOperation({
    summary: '폴더 단일 조회',
    description: '',
  }),
  ApiResponse({
    type: FolderResponse,
  }),
);

export const FindLinksInFolderDocs = applyDecorators(
  ApiOperation({
    summary: '폴더 내 링크 목록 조회',
    description: '',
  }),
  ApiResponse({
    type: PostListInFolderResponse,
  }),
);

export const UpdateFolderDocs = applyDecorators(
  ApiOperation({
    summary: '폴더 수정 API',
  }),
  ApiResponse({
    type: FolderSummaryResponse,
  }),
);

export const DeleteFolderDocs = applyDecorators(
  ApiOperation({
    summary: '폴더 삭제 API',
  }),
);
