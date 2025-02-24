import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Asignacion } from '../asignacion/asignacion.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  correo: string;

  @Column({ type: 'varchar', length: 50 })
  rol: 'miembro' | 'administrador';

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Asignacion, (asignacion) => asignacion.usuario)
  asignaciones: Asignacion[];
}
