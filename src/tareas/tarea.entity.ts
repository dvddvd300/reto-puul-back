import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Asignacion } from '../asignacion/asignacion.entity';

@Entity('tareas')
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'int', nullable: true })
  estimacion_horas: number;

  @Column({ type: 'timestamp', nullable: true })
  fecha_vencimiento: Date;

  @Column({ type: 'varchar', length: 50 })
  estado: 'activa' | 'terminada';

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.0 })
  costo: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Asignacion, (asignacion) => asignacion.tarea)
  asignaciones: Asignacion[];
}
