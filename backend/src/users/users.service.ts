import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}
    
    async findByusername(username: string): Promise<User | undefined | null> {
        return this.userModel.findOne({username}).exec();
    }

    async findAll(): Promise<User[]> {
        return this.userModel
          .find({ roles: { $ne: 'admin' } }) // récupère les users dont roles **ne contient pas** 'admin'
          .select('-password')                // optionnel : ne pas renvoyer le mot de passe
          .exec();
      }
}
