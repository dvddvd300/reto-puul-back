import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async crearUsuario(nombre: string, correo: string, rol: 'miembro' | 'administrador') {
    const usuario = this.usuarioRepo.create({ nombre, correo, rol });
    return this.usuarioRepo.save(usuario);
  }

  async listarUsuarios() {
    return this.usuarioRepo.find({ relations: ['tareas'] });
  }
}
