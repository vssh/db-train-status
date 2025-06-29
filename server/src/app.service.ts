import { Injectable } from '@nestjs/common';
import { Location } from '../../dto/location';
import { Arrival, Departure, TransitList } from '../../dto/transit';
import { LocationFactory } from './factory/location.factory';
import { TransitFactory } from './factory/transit-factory';

@Injectable()
export class AppService {
  private client;
  constructor(
    private readonly locationFactory: LocationFactory,
    private readonly transitFactory: TransitFactory,
  ) {}

  async getClient() {
		if (this.client) {
			return this.client;
		}

	  const userAgent = 'db-train-status';
	  const dbnavProfile = (await import('db-vendo-client/p/dbnav/index.js')).profile;
	  const createClient = (await import('db-vendo-client')).createClient;
	  this.client = createClient(dbnavProfile, userAgent);

	  return this.client;
  }

  async getLocations(name: string): Promise<Location[]> {
	const client = await this.getClient();
    const results: Location[] = await client.locations(name, {
      results: 5,
      stops: true,
      addresses: false,
      poi: false,
      language: 'de',
    });

    return results.map((res: Location) => {
      return this.locationFactory.fromVendoLocation(res);
    });
  }

  async getDeparturesAndArrivals(
    id: string,
    duration: number,
  ): Promise<TransitList> {
    const options = {
      when: Date.now(),
      duration,
      remarks: true,
      includeRelatedStations: false,
      language: 'de',
      products: {
        nationalExpress: true,
        national: true,
        regionalExpress: true,
        regional: true,
        suburban: false,
        bus: false,
        ferry: false,
        subway: false,
        tram: true,
        taxi: false,
      },
    };


	  const client = await this.getClient();
    const departuresPromise = client.departures(id, options);
    const arrivalsPromise = client.arrivals(id, options);

    const results = await Promise.all([departuresPromise, arrivalsPromise]);

    const departures: Departure[] = results[0].departures.map((dep) => {
      return this.transitFactory.departureFromVendoObj(dep);
    });
    const arrivals: Arrival[] = results[1].arrivals.map((arr) => {
      return this.transitFactory.arrivalFromVendoObj(arr);
    });
    return {
      departures,
      arrivals,
    };
  }
}
