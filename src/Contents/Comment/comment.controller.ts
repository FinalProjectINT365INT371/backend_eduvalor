import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  PayloadTooLargeException,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { query } from 'express';
import {
  FileInterceptor,
  FilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { ContentService } from '../content.service';
import { CommentService } from './comment.service';
import { CommentContent } from './dto/createComment.dto';
import { DeleteComment, UpdateComment } from './dto/updateComment.dto';
import { Roles } from 'src/Authorization/roles.decorator';
import { ROLES } from 'src/Authorization/ROLES';
import { RolesGuard } from 'src/Authorization/roles.guard';
import { JwtAuthGuard } from 'src/Auth/guard/jwt-auth.guard';
@Controller('content/comment')
export class CommentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly commentService: CommentService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.DEVELOPER, ROLES.ADMIN, ROLES.CONTENT_CREATOR)
  @UsePipes(ValidationPipe)
  @Post('addcomment')
  async create(@Body() createComment: CommentContent) {
    let commentCreated = await this.commentService.addComment(createComment);
    if (commentCreated != null) {
      return `Save new comment successful : ${commentCreated.id}`;
    }
    return `Have some error`;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.DEVELOPER, ROLES.ADMIN, ROLES.CONTENT_CREATOR)
  @UsePipes(ValidationPipe)
  @Put('updatecomment')
  async update(@Body() updateComment: UpdateComment) {
    let commentUpdated = await this.commentService.updateComment(updateComment);
    if (commentUpdated != null) {
      return `Update comment successful : ${commentUpdated.id}`;
    }
    return `Have some error`;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.DEVELOPER, ROLES.ADMIN, ROLES.CONTENT_CREATOR)
  @UsePipes(ValidationPipe)
  @Delete('deletecomment')
  async delete(@Body() deleteComment: DeleteComment) {
    let commentDeleted = await this.commentService.deleteComment(deleteComment);
    if (commentDeleted != null) {
      return `Delete comment successful : ${commentDeleted.id}`;
    }
    return `Have some error`;
  }
}
