import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionsService } from './missions.service';
import { MissionsController } from './missions.controller';
import { Mission, MissionSchema } from './schemas/mission.schema';
import { MissionsGateway } from './missions.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Mission.name, schema: MissionSchema }
    ]),
  ],
  controllers: [MissionsController],
  providers: [MissionsService, MissionsGateway],
})
export class MissionsModule {}
