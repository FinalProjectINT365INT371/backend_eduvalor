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
import { ContentApprovingService } from './contentApproving.service';
import { CreateContentApproving } from './dto/createContentApproving.dto';
import {
  DeleteContentApproving,
  UpdateContentApproving,
} from './dto/updateContentApproving';
import { Roles } from 'src/Authorization/roles.decorator';
import { ROLES } from 'src/Authorization/ROLES';
import { RolesGuard } from 'src/Authorization/roles.guard';
import { JwtAuthGuard } from 'src/Auth/guard/jwt-auth.guard';
@Controller('content/approve')
export class ApproveContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly contentApprovingService: ContentApprovingService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.DEVELOPER, ROLES.ADMIN, ROLES.CONTENT_CREATOR)
  @UsePipes(ValidationPipe)
  @Post('addapprove')
  async create(@Body() createApproveContent: CreateContentApproving) {
    let approveContentCreated =
      await this.contentApprovingService.addContentApproving(
        createApproveContent,
      );
    if (approveContentCreated != null) {
      return `Save new approve content successful : ${approveContentCreated.id}`;
    }
    return `Have some error`;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.DEVELOPER, ROLES.ADMIN, ROLES.CONTENT_CREATOR)
  @UsePipes(ValidationPipe)
  @Put('updateapprove')
  async update(@Body() updateApproveContent: UpdateContentApproving) {
    let approveContentUpdated =
      await this.contentApprovingService.updateContentApproved(
        updateApproveContent,
      );
    if (approveContentUpdated != null) {
      return `Update approve content successful : ${approveContentUpdated.id}`;
    }
    return `Have some error`;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.DEVELOPER, ROLES.ADMIN, ROLES.CONTENT_CREATOR)
  @UsePipes(ValidationPipe)
  @Delete('deleteapprove')
  async delete(@Body() deleteApproveContent: DeleteContentApproving) {
    let approveContentDeleted =
      await this.contentApprovingService.deleteContentApproved(
        deleteApproveContent,
      );
    if (approveContentDeleted != null) {
      return `Delete approve content successful : ${approveContentDeleted.id}`;
    }
    return `Have some error`;
  }
}
