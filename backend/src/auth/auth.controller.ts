import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../users/decorator/roles.decorator';
import { CreerUserDto } from '../users/dto/creer-user.dto';
import { Role } from '../users/enum/role.enum';
import { RolesGuard } from '../users/guard/roles.guard';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/create")
    creer(@Body() dto: CreerUserDto) {
        return this.authService.creer(dto);
    }

    @Post("/login")
    login(@Body() signInDto: Record<string, any>) {
        return this.authService.log(signInDto.username,signInDto.password);
    }

    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.Agent)
    @Get("/test")
    test(){
        return "tafiditra ohhhh";
    }

}
