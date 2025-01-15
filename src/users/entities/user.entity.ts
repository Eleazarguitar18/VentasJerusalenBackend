import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
/* 
id
usuario
nombre
email
password
creado en
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
  @Column()
  id_persona: number;
  @Column({ default: false })
  estado: boolean;
  @CreateDateColumn()
  createdAt: Date; // Se llenará automáticamente cuando se cree el registro.

  @UpdateDateColumn()
  updatedAt: Date; // Se actualizará automáticamente cada vez que el registro cambie.
}
