import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '@src/modules/posts/dto/create-post.dto';
import { PostsRepository } from '@src/modules/posts/posts.repository';
import { AwsLambdaService } from '@src/infrastructure/aws-lambda/aws-lambda.service';
import { parseLinkTitleAndContent } from '@src/common';

@Injectable()
export class PostsService {
  constructor(
    private readonly awsLambdaService: AwsLambdaService,
    private readonly postRepository: PostsRepository,
  ) {}
  async createPost(
    createPostDto: CreatePostDto,
    userId: string,
  ): Promise<boolean> {
    const { title, content } = await parseLinkTitleAndContent(
      createPostDto.url,
    );
    // TODO ai 요청용 람다 함수 생성 후 작업
    // const ai_lambda_function_name = 'ai_lambda_function_name';
    // const payload = {
    //   postContent: content,
    //   folderList: ['dummy_folder_list'],
    // };
    // this.awsLambdaService.invoke_lambda(ai_lambda_function_name, payload);

    return await this.postRepository.createPost(
      userId,
      createPostDto.folderId,
      createPostDto.url,
      title,
    );
  }
}
