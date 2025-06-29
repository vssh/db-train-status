import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationFactory } from './factory/location.factory';
import { TransitFactory } from './factory/transit-factory';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, LocationFactory, TransitFactory],
})
export class AppModule {}
