// src/missions/schemas/mission.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MissionDocument = Mission & Document;

@Schema({ timestamps: true })
export class Mission {
  @Prop({ required: true })
  titre: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Agent', required: true })
  agentAssigne: Types.ObjectId;

  @Prop({ 
    type: String, 
    enum: ['en_attente', 'en_cours', 'terminee', 'annulee'],
    default: 'en_attente'
  })
  statut: string;

  @Prop({ required: true })
  dateDebut: Date;

  @Prop({ required: true })
  dateFin: Date;

  @Prop()
  lieu: string;

  @Prop({ 
    type: String, 
    enum: ['basse', 'moyenne', 'haute', 'critique'],
    default: 'moyenne'
  })
  priorite: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  creePar: Types.ObjectId;

  @Prop({ type: [String] })
  notes: string[];
}

export const MissionSchema = SchemaFactory.createForClass(Mission);