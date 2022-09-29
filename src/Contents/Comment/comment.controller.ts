  /*ทำ เส้น สำหรับ comment โดน รุ้ว่าใครคอมเน้นอะไร ที่คอนเท้นอะไร */
  /*เก้บข้อมูลที่ content กับ table ใหม่ โดยใส่่ user กับ comment กับ content*/

  /*Share : coppies link, facebook, twitter*/

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
  } from '@nestjs/common';
  import { query } from 'express';
  import { FileInterceptor, FilesInterceptor,FileFieldsInterceptor } from '@nestjs/platform-express';
import { ContentService } from '../content.service';
import { CommentService } from './comment.service';
import { CommentContent } from './dto/comment.dto';
  @Controller('content/comment')
  export class CommentController {
    constructor(
      private readonly contentService: ContentService,
      private readonly commentService: CommentService,
    ) {}
  
    //Search Service
    @Post('addcomment')
    async create(@Body() createComment: CommentContent,) {
      let commentCreated = await this.commentService.addComment(createComment);
      if (commentCreated != null) {
        return `Save new comment successful : ${(commentCreated).id}`;
      }
      return `Have some error`;
    }
    
}