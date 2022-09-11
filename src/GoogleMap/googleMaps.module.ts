import { Module } from '@nestjs/common';
import { AuthModule } from 'src/Auth/auth.module';
import { GoogleMapsService } from '../GoogleMap/googleMaps.service';
import { GoogleMapsController } from './googleMaps.controller';

@Module({
  imports: [AuthModule],
  controllers: [GoogleMapsController],
  providers: [GoogleMapsService],
  exports: [GoogleMapsService],
})
export class GoogleMapsModule {}
