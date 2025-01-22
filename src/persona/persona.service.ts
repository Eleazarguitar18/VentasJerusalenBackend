import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona) private personaRepository: Repository<Persona>,
  ) {}
  async create(createPersonaDto: CreatePersonaDto) {
    // const personaFound = this.personaRepository.findOne({
    //   where: {
    //     nombre: createPersonaDto.nombre,
    //     p_apellido: createPersonaDto.p_apellido,
    //     s_apellido: createPersonaDto.s_apellido,
    //   },
    // });
    // if (personaFound) {
    //   return new HttpException(
    //     'El usuario se encuetra registrado',
    //     HttpStatus.CONFLICT,
    //   );
    // }
    const newPersona = this.personaRepository.create(createPersonaDto);
    const savePersona = await this.personaRepository.save(newPersona);
    return { message: 'Persona creada exitosamente', data: savePersona };
  }

  findAll() {
    return this.personaRepository.find({
      where: {
        estado: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} persona`;
  }

  update(id: number, updatePersonaDto: UpdatePersonaDto) {
    return `This action updates a #${id} persona`;
  }

  remove(id: number) {
    return `This action removes a #${id} persona`;
  }
}
