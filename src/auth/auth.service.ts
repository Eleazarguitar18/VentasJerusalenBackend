import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { loginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Persona } from 'src/persona/entities/persona.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Persona) private personaRepository: Repository<Persona>,
  ) {}
  async login(loginDto: loginAuthDto) {
    // bucar al usuario
    const userFound = await this.userRepository.findOne({
      where: {
        usuario: loginDto.usuario,
      },
      relations: ['persona'],
    });
    if (!userFound) {
      return new HttpException('usuario not found', HttpStatus.NOT_FOUND);
    }
    //comparar contraseña
    const password_verify = await this.comparePassword(
      loginDto.password,
      userFound.password,
    );
    if (!password_verify) {
      return new HttpException('contraseña incorrecta', HttpStatus.FORBIDDEN);
    }
    return userFound;
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword); // Compara las contraseñas
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
