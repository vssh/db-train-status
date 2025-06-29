import { ApiProperty } from '@nestjs/swagger';

class Transit {
  @ApiProperty()
  tripId: string;

  @ApiProperty()
  when: string;

  @ApiProperty()
  plannedWhen: string;

  @ApiProperty()
  delay: number | null;
  @ApiProperty()
  platform: string;

  @ApiProperty()
  plannedPlatform: string;

  @ApiProperty()
  product: string;

  @ApiProperty()
  lineName: string | null;

  @ApiProperty()
  operatorName: string | null;
}

export class Departure extends Transit {
  @ApiProperty()
  direction: string;
}

export class Arrival extends Transit {
  @ApiProperty()
  provenance: string;
}

export class TransitList {
  @ApiProperty({ type: () => Departure })
  departures: Departure[];

  @ApiProperty({ type: () => Arrival })
  arrivals: Arrival[];
}
