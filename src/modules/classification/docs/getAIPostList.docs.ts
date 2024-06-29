import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AIPostListResponse } from '../dto/getAIPostList.dto';

export const GetAIPostListDocs = applyDecorators(
  ApiOperation({
    summary: '폴더 안에 들어있는 Post(링크) 리스트',
    description: 'AI 분류 추천된 링크 리스트.',
  }),
  ApiResponse({
    type: AIPostListResponse,
  }),
  ApiBearerAuth(),
);
