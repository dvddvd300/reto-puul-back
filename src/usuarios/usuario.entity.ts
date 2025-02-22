import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tarea } from '../tareas/tarea.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  rol: 'miembro' | 'administrador';

  @OneToMany(() => Tarea, tarea => tarea.usuario)
  tareas: Tarea[];
}
