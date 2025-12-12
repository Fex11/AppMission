import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreerUserDto } from '../users/dto/creer-user.dto';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
      ) {}


    async creer(dto:CreerUserDto){
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = new this.userModel({
            ...dto,
            password: hashedPassword
        });
        return user.save();
    }

    async log(username: string, pass: string): Promise<{ access_token: string, username: string, roles: string[],id:string }> {
        const user = await this.usersService.findByusername(username);
        if (!user) {
            throw new UnauthorizedException('Utilisateur introuvable');
        }
    
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            throw new UnauthorizedException("Mot de passe invalide");
        }
    
        const payload = { sub: user._id, username: user.username, roles: user.roles };
    
        return {
            access_token: await this.jwtService.signAsync(payload),
            username: user.username,
            roles: user.roles,
            id:user._id.toString(),
        };
    }
    




    
}
