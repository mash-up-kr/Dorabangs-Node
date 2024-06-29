import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const ClassificationControllerDocs = applyDecorators(
  ApiTags('AI classification API'),
);
