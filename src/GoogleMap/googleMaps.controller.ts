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
import { add, Logger } from 'winston';
import { MapAddressReq } from './dto/addressReq.dto';
import { Address, GoogleMapsService } from './googleMaps.service';
@Controller('googleMaps')
export class GoogleMapsController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleMapsService: GoogleMapsService,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  @Post('getCoordinates')
  async getCoordinates(@Body() address: MapAddressReq) {
    let addressObject: Address = {
      street: address.Street,
      number: address.Number,
      city: address.City,
      state: address.State,
      postalCode: address.PostalCode,
    };
    return this.googleMapsService.getCoordinates(addressObject);
  }
}
