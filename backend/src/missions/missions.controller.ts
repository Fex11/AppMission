import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Roles } from '../users/decorator/roles.decorator';
import { Role } from '../users/enum/role.enum';
import { RolesGuard } from '../users/guard/roles.guard';
import { CreateMissionDto } from './dto/create-mission.dto';
import { MissionsService } from './missions.service';


@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
  @Post('creating-mission')
  create(@Body() createMissionDto: CreateMissionDto) {
    return this.missionsService.create(createMissionDto);
  }

  @UseGuards(AuthGuard)
  @Get("/filtered")
  async findFiltered(
    @Query('status') status?: string,
    @Query('assignedTo') assignedTo?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '3',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return this.missionsService.findAllFiltered({
      status,
      assignedTo,
      page: pageNumber,
      limit: limitNumber,
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.missionsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionsService.findOne(id);
  }
  
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Agent)
  @Patch('status/:id')
  async updateStatus(@Param('id') id: string, @Query('action') action: string,) {
    return this.missionsService.updateStatus(id, action);
  }


  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMissionDto: CreateMissionDto) {
    return this.missionsService.update(id, updateMissionDto);
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.missionsService.remove(id);
  }
}

