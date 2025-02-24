import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './tarea.entity';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { Asignacion } from '../asignacion/asignacion.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tarea, Asignacion]),
    UsuariosModule,
  ],
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}
