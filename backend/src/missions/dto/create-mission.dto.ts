import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateMissionDto {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsNotEmpty()
  @IsEnum(['pending', 'in_progress', 'completed'])
  status?: 'pending' | 'in_progress' | 'completed';

  @IsNotEmpty()
  @IsMongoId()
  assignedTo?: string; // User._id
}