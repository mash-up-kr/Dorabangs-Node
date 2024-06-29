import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '@src/modules/posts/dto/create-post.dto';
import { PostsRepository } from '@src/modules/posts/posts.repository';
import { UpdatePostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostsRepository) {}
  async createPost(
    createPostDto: CreatePostDto,
    userId: string,
  ): Promise<boolean> {
    // TODO get title from url
    const title: string = 'temp title';

    return await this.postRepository.createPost(
      userId,
      createPostDto.folderId,
      createPostDto.url,
      title,
    );
  }

  async updatePost(userId: string, postId: string, dto: UpdatePostDto) {
    // Find if post exist
    await this.postRepository.findPostOrThrow(userId, postId);

    // Update post folder id
    await this.postRepository.updatePost(userId, postId, dto.folderId);

    //return response;
    return true;
  }
}
