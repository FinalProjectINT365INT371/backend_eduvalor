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
} from '@nestjs/common';
import { query } from 'express';
import {
  FileInterceptor,
  FilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { ContentService } from '../content.service';
import { ContentApprovingService } from './contentApproving.service';
import { CreateContentApproving } from './dto/createContentApproving.dto';
import {
  DeleteContentApproving,
  UpdateContentApproving,
} from './dto/updateContentApproving';
@Controller('content/approve')
export class ApproveContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly contentApprovingService: ContentApprovingService,
  ) {}

  //Search Service
  @UsePipes(ValidationPipe)
  @Post('addapprove')
  async create(@Body() createApproveContent: CreateContentApproving) {
    let approveContentCreated =
      await this.contentApprovingService.addContentApproving(createApproveContent);
    if (approveContentCreated != null) {
      return `Save new approve content successful : ${approveContentCreated.id}`;
    }
    return `Have some error`;
  }

  @UsePipes(ValidationPipe)
  @Put('updateapprove')
  async update(@Body() updateApproveContent: UpdateContentApproving) {
    let approveContentUpdated =
      await this.contentApprovingService.updateContentApproved(updateApproveContent);
    if (approveContentUpdated != null) {
      return `Update approve content successful : ${approveContentUpdated.id}`;
    }
    return `Have some error`;
  }

  @UsePipes(ValidationPipe)
  @Delete('deleteapprove')
  async delete(@Body() deleteApproveContent: DeleteContentApproving) {
    let approveContentDeleted =
      await this.contentApprovingService.deleteContentApproved(deleteApproveContent);
    if (approveContentDeleted != null) {
      return `Delete approve content successful : ${approveContentDeleted.id}`;
    }
    return `Have some error`;
  }
}
