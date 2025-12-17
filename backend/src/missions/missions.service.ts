import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMissionDto } from './dto/create-mission.dto';
import { MissionsGateway } from './missions.gateway';
import { Mission, MissionDocument } from './schemas/mission.schema';

@Injectable()
export class MissionsService {
  constructor(
    @InjectModel(Mission.name)
    private missionModel: Model<MissionDocument>,
    private readonly missionsGateway: MissionsGateway,
  ) {}

  async create(createMissionDto: CreateMissionDto): Promise<Mission> {
    const mission = new this.missionModel(createMissionDto);

    this.missionsGateway.notifyUser(
      mission.assignedTo.toString(),
      'new-mission',
      mission,
    );
    
    return mission.save(); // ✅ ENREGISTRÉ EN BASE
  }

  async findAll(): Promise<Mission[]> {
    return this.missionModel
      .find()
      .populate('assignedTo')  // remplace l'_id par l'objet User complet
      .exec();
  }

  async findOne(id: string): Promise<Mission | null> {
    return this.missionModel.findById(id).populate('assignedTo').exec();
  }

  async update(id: string, updateMissionDto: CreateMissionDto): Promise<Mission | null> {
    return this.missionModel.findByIdAndUpdate(
      id,
      updateMissionDto,
      { new: true }
    ).exec();
  }

  async updateStatus(id: string, action:string): Promise<Mission | null> {
    let newStatus:string;
    if (action === 'debute') newStatus = 'in_progress';
    else if (action === 'terminate') newStatus = 'completed';
    else throw new BadRequestException('Statut invalide'); 

    return this.missionModel.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    ).exec();
  } 

  async remove(id: string): Promise<Mission | null> {
    return this.missionModel.findByIdAndDelete(id).exec();
  }

  async findAllFiltered({
    status,
    assignedTo,
    page = 1,
    limit = 3,
  }: {
    status?: string;
    assignedTo?: string;
    page?: number;
    limit?: number;
  }) {
    const query: any = {};
    if (status) query.status = status;
    if (assignedTo) query.assignedTo = assignedTo;

    const skip = (page - 1) * limit;

    const missions = await this.missionModel
      .find(query)
      .populate('assignedTo', 'username') // pour obtenir le nom de l'utilisateur
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await this.missionModel.countDocuments(query);

    return {
      data: missions,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}
