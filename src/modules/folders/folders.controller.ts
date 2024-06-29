import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { MutateFolderDto } from './dto';
import { GetUser } from '@src/common';
import {
  CreateFolderDocs,
  DeleteFolderDocs,
  FindAFolderListDocs,
  FindFolderDocs,
  FindLinksInFolderDocs,
  FolderControllerDocs,
  UpdateFolderDocs,
} from './docs';
import {
  FolderListResponse,
  FolderSummaryResponse,
  PostListInFolderResponse,
} from './responses';
import { JwtGuard } from '../users/guards';
import { PostsService } from '../posts/posts.service';
import { GetPostQueryDto } from '../posts/dto/find-in-folder.dto';

@FolderControllerDocs
@UseGuards(JwtGuard)
@Controller('folders')
export class FoldersController {
  constructor(
    private readonly foldersService: FoldersService,
    private readonly postsService: PostsService,
  ) {}

  @CreateFolderDocs
  @Post()
  async create(
    @GetUser('id') userId: string,
    @Body() createFolderDto: MutateFolderDto,
  ) {
    await this.foldersService.create(userId, createFolderDto);
  }

  @FindAFolderListDocs
  @Get()
  async findAll(@GetUser() userId: string) {
    const folders = await this.foldersService.findAll(userId);
    return new FolderListResponse(folders);
  }

  @FindFolderDocs
  @Get(':folderId')
  async findOne(
    @GetUser() userId: string,
    @Param('folderId') folderId: string,
  ) {
    const folder = await this.foldersService.findOne(userId, folderId);
    return new FolderSummaryResponse(folder);
  }

  @FindLinksInFolderDocs
  @Get(':folderId/posts')
  async findLinksInFolder(
    @GetUser() userId: string,
    @Param('folderId') folderId: string,
    @Query() query: GetPostQueryDto,
  ) {
    const result = await this.postsService.findByFolderId(
      userId,
      folderId,
      query,
    );

    return new PostListInFolderResponse(
      query.page,
      query.limit,
      result.count,
      result.posts,
    );
  }

  @UpdateFolderDocs
  @Patch(':folderId')
  async update(
    @GetUser() userId: string,
    @Param('folderId') folderId: string,
    @Body() updateFolderDto: MutateFolderDto,
  ) {
    await this.foldersService.update(userId, folderId, updateFolderDto);
  }

  @DeleteFolderDocs
  @Delete(':folderId')
  async remove(@GetUser() userId: string, @Param('folderId') folderId: string) {
    await this.foldersService.remove(userId, folderId);
  }
}
