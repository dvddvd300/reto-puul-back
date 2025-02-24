import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './tarea.entity';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepo: Repository<Tarea>,
  ) {}

  async crearTarea(datos: { titulo: string; descripcion: string; estimacionHoras: number; fechaVencimiento: Date; estado: 'activa' | 'terminada'; costo: number }) {
    const tarea = this.tareaRepo.create(datos);
    return this.tareaRepo.save(tarea);
  }

  async listarTareas(filtros?: { fechaVencimiento?: Date; titulo?: string; usuarioAsignado?: string; nombreUsuario?: string; correoUsuario?: string }) {
    const query = this.tareaRepo.createQueryBuilder('tarea');

    if (filtros) {
      if (filtros.fechaVencimiento) {
        query.andWhere('tarea.fechaVencimiento = :fechaVencimiento', { fechaVencimiento: filtros.fechaVencimiento.toISOString().split('T')[0] });
      }
      if (filtros.titulo) {
        query.andWhere('tarea.titulo LIKE :titulo', { titulo: `%${filtros.titulo}%` });
      }
      if (filtros.usuarioAsignado) {
        query.andWhere('tarea.usuarioAsignado = :usuarioAsignado', { usuarioAsignado: filtros.usuarioAsignado });
      }
      if (filtros.nombreUsuario) {
        query.andWhere('tarea.nombreUsuario LIKE :nombreUsuario', { nombreUsuario: `%${filtros.nombreUsuario}%` });
      }
      if (filtros.correoUsuario) {
        query.andWhere('tarea.correoUsuario LIKE :correoUsuario', { correoUsuario: `%${filtros.correoUsuario}%` });
      }
    }

    query.orderBy('tarea.fechaVencimiento', 'DESC');

    return query.getMany();
  }
}
