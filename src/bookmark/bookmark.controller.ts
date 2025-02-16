import {
  Controller,
  Delete,
  UseGuards,
  Get,
  Post,
  Patch,
  ParseIntPipe,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import { Param } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  getBookmarks(@GetUser('id') UserId: number) {
    return this.bookmarkService.getBookmarks(UserId);
  }

  @Post()
  createBookmarks(
    @GetUser('id') UserId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmarks(UserId, dto);
  }

  @Get(':id')
  getBookmarksbyId(
    @GetUser('id') UserId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarksbyId(UserId, bookmarkId);
  }

  @Patch(':id')
  editBookmarksbyId(
    @GetUser('id') UserId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarkService.editBookmarksbyId(UserId, bookmarkId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarksbyId(
    @GetUser('id') UserId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarksbyId(UserId, bookmarkId);
  }
}
