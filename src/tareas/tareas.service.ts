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

  async listarTareas() {
    return this.tareaRepo.find({ order: { fechaVencimiento: 'ASC' } });
  }
}
