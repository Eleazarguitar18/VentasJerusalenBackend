import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Persona } from 'src/persona/entities/persona.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Persona) private personaRepository: Repository<Persona>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const newPersona = this.personaRepository.create(createUserDto);
    const savePersona = await this.personaRepository.save(newPersona);
    console.log('nueva personaaaa', savePersona);

    const newUser = this.userRepository.create(createUserDto);
    newUser.id_persona = savePersona;
    const saveUser = await this.userRepository.save(newUser);
    console.log(saveUser);
    return saveUser;
  }

  findAll() {
    return this.userRepository.find({
      where: {
        estado: true,
      },
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
