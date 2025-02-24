import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Tarea } from '../tareas/tarea.entity';

@Entity()
export class Asignacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.asignaciones, { onDelete: 'CASCADE' })
  usuario: Usuario;

  @ManyToOne(() => Tarea, (tarea) => tarea.asignaciones, { onDelete: 'CASCADE' })
  tarea: Tarea;
}
