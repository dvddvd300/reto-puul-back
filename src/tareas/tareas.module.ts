import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './tarea.entity';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tarea])],
  controllers: [TareasController],
  providers: [TareasService]
})
export class TareasModule {}
