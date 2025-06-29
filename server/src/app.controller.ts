import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Location } from '../../dto/location';
import { ApiResponse } from '@nestjs/swagger';
import { TransitList } from '../../dto/transit';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('locations')
  @ApiResponse({
    status: 200,
    description: 'List of stations',
    type: Location,
    isArray: true,
  })
  getLocations(@Query('name') name: string) {
    return this.appService.getLocations(name);
  }

  @Get('transit')
  @ApiResponse({
    status: 200,
    description: 'List of departures and arrivals',
    type: TransitList,
  })
  getTransitOptions(
    @Query('stationId') id: string,
    @Query('duration') duration: number,
  ) {
    return this.appService.getDeparturesAndArrivals(id, duration);
  }
}
