// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MissionsModule } from './missions/missions.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    MissionsModule, // Ajout du module missions
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: 'mongodb://root:example@mongo:27017/mission?authSource=admin',
      }),
    }),    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}