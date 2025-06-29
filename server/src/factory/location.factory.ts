import { Location } from '../../../dto/location';

export class LocationFactory {
  fromVendoLocation(loc: any): Location {
    return { type: loc.type, id: loc.id, name: loc.name };
  }
}
