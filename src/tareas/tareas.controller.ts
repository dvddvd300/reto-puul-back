import { Controller, Get, Post, Body } from '@nestjs/common';
import { TareasService } from './tareas.service';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post()
  crearTarea(@Body() body: { titulo: string; descripcion: string; estimacionHoras: number; fechaVencimiento: Date; estado: 'activa' | 'terminada'; costo: number }) {
    return this.tareasService.crearTarea(body);
  }

  @Get()
  listarTareas() {
    return this.tareasService.listarTareas();
  }
}
