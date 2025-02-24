import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { TareasService } from './tareas.service';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post()
  crearTarea(
    @Body() body: { titulo: string; descripcion: string; estimacionHoras: number; fechaVencimiento: Date; estado: 'activa' | 'terminada'; costo: number }
  ) {
    return this.tareasService.crearTarea(body);
  }

  @Get()
  listarTareas(
    @Query('fechaVencimiento') fechaVencimiento?: string,
    @Query('titulo') titulo?: string,
    @Query('usuarioAsignado') usuarioAsignado?: string,
    @Query('nombreUsuario') nombreUsuario?: string,
    @Query('correoUsuario') correoUsuario?: string
  ) {
    return this.tareasService.listarTareas({
      fechaVencimiento: fechaVencimiento ? new Date(fechaVencimiento) : undefined,
      titulo,
      usuarioAsignado,
      nombreUsuario,
      correoUsuario,
    });
  }

  @Delete(':id')
  async eliminarTarea(@Param('id') id: number) {
    return this.tareasService.eliminarTarea(id);
  }


  @Get('analitica')
async obtenerAnalitica() {
  return this.tareasService.obtenerAnalitica();
}

}
