import { CreatePersonaDto } from 'src/persona/dto/create-persona.dto';

export class CreateUserDto {
  id: number;
  usuario: string;
  nombre: string;
  email: string;
  password: string;
  estado: boolean;
  id_persona: CreatePersonaDto;
}
