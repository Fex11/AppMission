import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMissionDto {
  @IsNotEmpty()
  @IsString()
  titre: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  agentAssigne: string;

  @IsString()
  statut: string;

  @IsString()
  dateDebut: string;

  @IsString()
  dateFin: string;

  @IsString()
  lieu: string;

  @IsString()
  priorite: string;

  @IsString()
  creePar: string;
}