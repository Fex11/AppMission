import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mission, MissionDocument } from './schemas/mission.schema';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';

@Injectable()
export class MissionsService {
  constructor(
    @InjectModel(Mission.name)
    private missionModel: Model<MissionDocument>,
  ) {}

  async create(createMissionDto: CreateMissionDto): Promise<Mission> {
    const mission = new this.missionModel(createMissionDto);
    return mission.save(); // ✅ ENREGISTRÉ EN BASE
  }

  async findAll(): Promise<Mission[]> {
    return this.missionModel.find().exec();
  }

  async findOne(id: string): Promise<Mission> {
    return this.missionModel.findById(id).exec();
  }

  async update(id: string, updateMissionDto: UpdateMissionDto): Promise<Mission> {
    return this.missionModel.findByIdAndUpdate(
      id,
      updateMissionDto,
      { new: true }
    ).exec();
  }

  async remove(id: string): Promise<Mission> {
    return this.missionModel.findByIdAndDelete(id).exec();
  }
}
