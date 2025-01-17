export class CreateUserDto {
  usuario: string;
  email: string;
  password: string;
  estado: boolean;
  nombre: string;
  p_apellido: string;
  s_apellido: string;
  fecha_nacimiento: Date;
  telefono: number;
}
