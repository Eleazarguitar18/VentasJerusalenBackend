import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/users/entities/user.entity';
import { Persona } from 'src/persona/entities/persona.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Persona])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
