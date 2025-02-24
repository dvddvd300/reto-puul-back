import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Asignacion } from '../asignacion/asignacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), TypeOrmModule.forFeature([Asignacion])],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule {}