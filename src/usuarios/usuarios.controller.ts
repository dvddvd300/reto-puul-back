import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  crearUsuario(@Body() body: { nombre: string; correo: string; rol: 'miembro' | 'administrador' }) {
    return this.usuariosService.crearUsuario(body.nombre, body.correo, body.rol);
  }

  @Get()
  listarUsuarios() {
    return this.usuariosService.listarUsuarios();
  }
}
