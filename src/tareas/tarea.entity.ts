import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';

@Entity()
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  estimacionHoras: number;

  @Column({ type: 'timestamp' })
  fechaVencimiento: Date;

  @Column()
  estado: 'activa' | 'terminada';

  @Column({ type: 'decimal', default: 0 })
  costo: number;

  @ManyToOne(() => Usuario, usuario => usuario.tareas)
  usuario: Usuario;
}
