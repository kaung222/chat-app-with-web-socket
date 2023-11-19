import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';
import { Role } from 'src/authentication/roles.decorator';
import { AuthorGuard } from 'src/authentication/owner.guard';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('posts')
// @UseGuards(AuthGuard, AuthenticationGuard)
// @Role(['user', 'admin'])
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get('/hello')
  getAllPosts() {
    return 'this is all posts';
  }

  @SkipThrottle({ default: true })
  @UseGuards(AuthGuard, AuthenticationGuard)
  @Role(['admin', 'author'])
  @Get()
  findAll() {
    return this.postsService.findAll();
  }
  @UseGuards(AuthGuard, AuthenticationGuard)
  @Role(['admin', 'author'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @UseGuards(AuthGuard, AuthorGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    // return this.postsService.remove(id);
    return id;
  }
}
