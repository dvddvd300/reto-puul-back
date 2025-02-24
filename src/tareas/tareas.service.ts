import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './tarea.entity';
import { Asignacion } from '../asignacion/asignacion.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepo: Repository<Tarea>,
    @InjectRepository(Asignacion) private readonly asignacionRepo: Repository<Asignacion>,
    @InjectRepository(Usuario) private readonly usuarioRepo: Repository<Usuario>,
  ) { }

  async crearTarea(datos: { titulo: string; descripcion: string; estimacionHoras: number; fechaVencimiento: Date; estado: 'activa' | 'terminada'; costo: number; usuarioIds?: number[] }) {
    const tarea = this.tareaRepo.create(datos);

    if (datos.usuarioIds && datos.usuarioIds.length > 0) {
      const usuarios = await this.usuarioRepo.findByIds(datos.usuarioIds);
      await this.asignacionRepo.delete({ tarea: { id: tarea.id } });

      for (const usuario of usuarios) {
        await this.asignacionRepo.insert({
          usuario: { id: usuario.id },
          tarea: { id: tarea.id },
        });
      }
    }

    return this.tareaRepo.save(tarea);
  }

  async listarTareas(filtros?: { titulo?: string; fechaVencimiento?: Date; usuarioAsignado?: number; nombreUsuario?: string; correoUsuario?: string }) {
    const query = this.tareaRepo.createQueryBuilder('tarea')
      .leftJoinAndSelect('asignaciones_usuarios_tareas', 'asignacion', 'asignacion.tarea_id = tarea.id')
      .leftJoinAndSelect('usuarios', 'usuario', 'usuario.id = asignacion.usuario_id')
      .orderBy('tarea.created_at', 'DESC');

    if (filtros?.titulo) {
      query.andWhere('tarea.titulo LIKE :titulo', { titulo: `%${filtros.titulo}%` });
    }

    if (filtros?.fechaVencimiento) {
      query.andWhere('tarea.fecha_vencimiento = :fechaVencimiento', { fechaVencimiento: filtros.fechaVencimiento });
    }

    if (filtros?.usuarioAsignado) {
      query.andWhere('usuario.id = :usuarioId', { usuarioId: filtros.usuarioAsignado });
    }

    if (filtros?.nombreUsuario) {
      query.andWhere('usuario.nombre LIKE :nombreUsuario', { nombreUsuario: `%${filtros.nombreUsuario}%` });
    }

    if (filtros?.correoUsuario) {
      query.andWhere('usuario.correo LIKE :correoUsuario', { correoUsuario: `%${filtros.correoUsuario}%` });
    }

    return query.getMany();
  }

  async asignarUsuarios(id: number, usuarioIds: number[]) {
    const tarea = await this.tareaRepo.findOne({ where: { id }, relations: ['usuarios'] });

    if (!tarea) {
      throw new Error('Tarea no encontrada');
    }

    const usuarios = await this.usuarioRepo.findByIds(usuarioIds);
    await this.asignacionRepo.delete({ tarea: { id } });

    for (const usuarioId of usuarios) {
      await this.asignacionRepo.insert({
        usuario: usuarioId,
        tarea: { id },
      });
    }

    return this.tareaRepo.save(tarea);
  }

  async actualizarTarea(id: number, datos: { titulo?: string; descripcion?: string; estimacionHoras?: number; fechaVencimiento?: Date; estado?: 'activa' | 'terminada'; costo?: number; usuariosAsignados?: number[] }) {
    await this.tareaRepo.update(id, datos);

    if (datos.usuariosAsignados) {
      // Eliminar asignaciones previas
      await this.asignacionRepo.delete({ tarea: { id } });

      // Asignar nuevos usuarios
      for (const usuarioId of datos.usuariosAsignados) {
        await this.asignacionRepo.insert({
          usuario: { id: usuarioId },
          tarea: { id },
        });
      }
    }

    return this.tareaRepo.findOne({ where: { id }, relations: ['usuarios'] });
  }

  async obtenerAnalitica() {
    const [activas, terminadas] = await Promise.all([
      this.tareaRepo.count({ where: { estado: 'activa' } }),
      this.tareaRepo.count({ where: { estado: 'terminada' } }),
    ]);

    const usuarioMasOcupado = await this.asignacionRepo
      .createQueryBuilder('asignacion')
      .select('usuario_id, COUNT(*) as cantidad')
      .groupBy('usuario_id')
      .orderBy('cantidad', 'DESC')
      .limit(1)
      .getRawOne();

    return {
      totalTareas: activas + terminadas,
      tareasPorEstado: { activas, terminadas },
      usuarioMasOcupado: usuarioMasOcupado ? usuarioMasOcupado.usuario_id : null,
    };
  }

  async eliminarTarea(id: number) {
    await this.asignacionRepo.delete({ tarea: { id } });
    return this.tareaRepo.delete(id); // Eliminar tarea
  }

}
