import { Client, LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleMapsService extends Client {
  private readonly accessKey = this.config.get('GOOGLE_MAPS_ACCESS_KEY');

  constructor(private config: ConfigService) {
    super();
  }

  async getCoordinates(address: {
    street: string;
    number: string;
    city: string;
    state: string;
    postalCode: string;
  }): Promise<LatLngLiteral> {
    const googleRes = await this.geocode({
      params: {
        address: `${address.street}, ${address.number}, ${address.city}, ${address.state}, ${address.postalCode}`,
        key: this.accessKey,
      },
    });

    const { lng, lat } = googleRes.data.results[0].geometry.location;
    return { lng, lat };
  }
}

export interface Address {
  street: string;
  number: string;
  city: string;
  state: string;
  postalCode: string;
}
