// mission.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type MissionDocument = Mission & Document;

@Schema({ timestamps: true }) // ajoute createdAt et updatedAt automatiquement
export class Mission {
  @Prop({ required: true })
  title!: string;

  @Prop()
  description?: string;

  @Prop({ default: 'pending', enum: ['pending', 'in_progress', 'completed'] })
  status!: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  assignedTo!: Types.ObjectId;
}

export const MissionSchema = SchemaFactory.createForClass(Mission);
