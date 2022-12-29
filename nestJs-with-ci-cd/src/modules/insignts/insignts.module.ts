import { Module } from '@nestjs/common';
import { InsigntsController } from './insignts.controller';
import { InsigntsService } from './insignts.service';

@Module({
  controllers: [InsigntsController],
  providers: [InsigntsService]
})
export class InsigntsModule {}
