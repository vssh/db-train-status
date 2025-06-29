import { Arrival, Departure } from '../../../dto/transit';

export class TransitFactory {
  departureFromVendoObj(dep: any): Departure {
    return {
      tripId: dep.tripId,
      when: dep.when,
      plannedWhen: dep.plannedWhen,
      delay: dep.delay,
      platform: dep.platform,
      plannedPlatform: dep.plannedPlatform,
      product: dep.product,
      lineName: dep.line?.name ?? null,
      operatorName: dep.line?.operator?.name ?? null,
      direction: dep.direction,
    };
  }

  arrivalFromVendoObj(arr: any): Arrival {
    return {
      tripId: arr.tripId,
      when: arr.when,
      plannedWhen: arr.plannedWhen,
      delay: arr.delay,
      platform: arr.platform,
      plannedPlatform: arr.plannedPlatform,
      product: arr.product,
      lineName: arr.line?.name ?? null,
      operatorName: arr.line?.operator?.name ?? null,
      provenance: arr.provenance,
    };
  }
}
