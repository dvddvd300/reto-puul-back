import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TareasModule } from './tareas/tareas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.1.164',
      port: 5438,
      username: 'postgres',
      password: 'examplepasword126',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsuariosModule,
    TareasModule,
  ],
})
export class AppModule {}
