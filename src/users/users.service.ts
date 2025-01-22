import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Persona } from 'src/persona/entities/persona.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Persona) private personaRepository: Repository<Persona>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const newPersona = this.personaRepository.create(createUserDto);
    const savePersona = await this.personaRepository.save(newPersona);
    console.log('nueva personaaaa', savePersona);

    // has password
    const password_has = await this.hashPassword(createUserDto.password);
    createUserDto.password = password_has;
    const newUser = this.userRepository.create(createUserDto);
    newUser.persona = savePersona;
    const saveUser = await this.userRepository.save(newUser);
    console.log(saveUser);
    return saveUser;
  }
  async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(
      this.configService.get<string>('BCRYPT_SALT_ROUNDS', '10'),
      10,
    ); // Convierte a número
    if (isNaN(saltRounds)) {
      throw new Error('Invalid salt rounds value');
    }
    const salt = await bcrypt.genSalt(saltRounds); // Genera el salt con las rondas configuradas
    return bcrypt.hash(password, salt); // Retorna la contraseña encriptada
  }
  findAll() {
    return this.userRepository.find({
      where: {
        estado: true,
      },
      relations: ['persona'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
