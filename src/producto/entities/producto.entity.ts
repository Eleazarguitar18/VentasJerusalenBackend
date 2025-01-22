import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  descripción: string;
  @Column()
  precio: number;
  @Column()
  categoria: string;
  @Column()
  imagen?: number;
  @Column()
  categoría: string; //(sopa, segundo);
  @Column()
  id_imagen: string;

  @CreateDateColumn()
  createdAt: Date; // Se llenará automáticamente cuando se cree el registro.

  @UpdateDateColumn()
  updatedAt: Date;
}
