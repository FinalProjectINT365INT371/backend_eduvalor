import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
  Body,
  Inject,
  forwardRef,
  HttpStatus,
  Req,
  Query,
} from '@nestjs/common';
import { AuthService } from 'src/Auth/auth.service';
import { ROLES } from 'src/Authorization/ROLES';
import { Roles } from 'src/Authorization/roles.decorator';
import { RolesGuard } from 'src/Authorization/roles.guard';
import { Logger } from 'winston';
import { Address, GoogleMapsService } from './googleMaps.service';
@Controller('googleMaps')
export class GoogleMapsController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleMapsService: GoogleMapsService,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  @Get('getCoordinates')
  getById(@Body() address: Address) {
    let addressObject: Address = {
      street: address.street,
      number: address.number,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
    };
    return this.googleMapsService.getCoordinates(addressObject);
  }
}
