import { Persona } from 'src/persona/entities/persona.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
/* 
id
usuario
nombre
email
password
creado en
{
    unique: true,
  }
*/
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
  })
  usuario: string;
  @Column()
  nombre: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ default: false })
  estado: boolean;
  @CreateDateColumn()
  createdAt: Date; // Se llenará automáticamente cuando se cree el registro.
  @UpdateDateColumn()
  updatedAt: Date; // Se actualizará automáticamente cada vez que el registro cambie.
  @OneToOne(() => Persona)
  @JoinColumn({ name: 'id_persona' })
  id_persona: Persona;
}
