import { Controller, Get, Post, Body, Query, Param, Patch, Delete } from '@nestjs/common';
import { TareasService } from './tareas.service';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) { }

  @Post()
  crearTarea(@Body() body: { titulo: string; descripcion: string; estimacionHoras: number; fechaVencimiento: Date; estado: 'activa' | 'terminada'; costo: number; usuarioIds?: number[] }) {
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
    const usuarioAsignadoNumero = usuarioAsignado ? Number(usuarioAsignado) : undefined;

    return this.tareasService.listarTareas({
      fechaVencimiento: fechaVencimiento ? new Date(fechaVencimiento) : undefined,
      titulo,
      usuarioAsignado: usuarioAsignadoNumero,
      nombreUsuario,
      correoUsuario,
    });
  }

  @Patch(':id')
  async actualizarTarea(
    @Param('id') id: number,
    @Body() body: { titulo?: string; descripcion?: string; estimacionHoras?: number; fechaVencimiento?: Date; estado?: 'activa' | 'terminada'; costo?: number; usuariosAsignados?: number[] }
  ) {
    return this.tareasService.actualizarTarea(id, body);
  }

  @Delete(':id')
  async eliminarTarea(@Param('id') id: number) {
    return this.tareasService.eliminarTarea(id);
  }

  @Patch(':id/asignar-usuarios')
  asignarUsuarios(@Param('id') id: number, @Body() body: { usuarioIds: number[] }) {
    return this.tareasService.asignarUsuarios(id, body.usuarioIds);
  }

  @Get('analitica')
async obtenerAnalitica() {
  return this.tareasService.obtenerAnalitica();
}

}
