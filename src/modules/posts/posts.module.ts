import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from '@src/modules/posts/posts.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '@src/infrastructure';
import { UsersModule } from '@src/modules/users/users.module';
import { AwsLambdaModule } from '@src/infrastructure/aws-lambda/aws-lambda.module';
import { AwsLambdaService } from '@src/infrastructure/aws-lambda/aws-lambda.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    UsersModule,
    AwsLambdaModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, AwsLambdaService],
})
export class PostsModule {}
