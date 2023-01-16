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
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth-guard';
import { GetUser } from '../auth/decorator/user.decorator';
import { findAllQueryDTO } from './dto/find-all-query.dto';
import { ValidationParamPipe, UsernameParamValidation } from '../../core/Pipes';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@GetUser() userId: number, @Body() dto: CreatePostDto) {
    return this.postsService.create(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@GetUser() userId: number) {
    return this.postsService.findAll(userId);
  }

  @Get('profile/:username')
  findUserPosts(@Param('username', UsernameParamValidation) username: string) {
    return this.postsService.findUserPosts(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ValidationParamPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @GetUser() userId: number,
    @Param('id', ValidationParamPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(userId, id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @GetUser() userId: number,
    @Param('id', ValidationParamPipe) id: number,
  ) {
    return this.postsService.remove(userId, id);
  }
}
