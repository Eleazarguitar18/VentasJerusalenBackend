import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  p_apellido: string;
  @Column()
  s_apellido: string;
  @Column()
  fecha_nacimiento: Date;
  @Column()
  telefono: number;
  @Column()
  estado: boolean;
  @CreateDateColumn()
  createdAt: Date; // Se llenará automáticamente cuando se cree el registro.

  @UpdateDateColumn()
  updatedAt: Date; // Se actualizará automáticamente cada vez que el registro cambie.
}
