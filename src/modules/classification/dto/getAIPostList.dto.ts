import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { Post, PostAIClassification, PostDocument } from '@src/infrastructure';
import { Document } from 'mongoose';
import { MergeType } from 'mongoose';
import { Types } from 'mongoose';

type InputType = Document<
  unknown,
  {},
  MergeType<
    Post,
    {
      aiClassificationId: PostAIClassification;
    }
  >
> &
  Omit<Post, 'aiClassificationId'> & {
    aiClassificationId: PostAIClassification;
  } & {
    _id: Types.ObjectId;
  };
export class AIPostServiceDto {
  @ApiProperty({ description: 'Id' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: 'Title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'URL' })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ description: 'Description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Keywords' })
  @IsArray()
  keywords: string[];

  @ApiProperty({ description: 'Created At' })
  @IsString()
  createdAt: Date;

  constructor(data: InputType) {
    this.id = data.id;
    this.title = data.title;
    this.url = data.url;
    this.description = data.description;
    this.keywords = data.aiClassificationId.keywords;
    this.createdAt = data.aiClassificationId.createdAt;
  }
}

export class AIPostListResponse {
  @ApiProperty({ type: [AIPostServiceDto] })
  @Type(() => AIPostServiceDto)
  list: AIPostServiceDto[];

  constructor(data: AIPostServiceDto[]) {
    this.list = data;
  }
}
