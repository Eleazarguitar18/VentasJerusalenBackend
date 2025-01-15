import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseTestService } from './database-test/database-test.service';
import { DatabaseTestController } from './database-test/database-test.controller';
import { UsersModule } from './users/users.module';
import { PersonaModule } from './persona/persona.module';
import { ClienteModule } from './cliente/cliente.module';
import { ProductoModule } from './producto/producto.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Cambiar a 'postgres' para PostgreSQL
      host: 'localhost', // Dirección del host
      port: 5432, // Puerto predeterminado de PostgreSQL
      username: 'postgres', // Usuario de PostgreSQL
      password: 'ele21', // Contraseña del usuario
      database: 'bd_ventas', // Nombre de la base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Aquí van las entidades del proyecto
      synchronize: true, //Sincronización automática, no usar en producción
    }),
    UsersModule,
    PersonaModule,
    ClienteModule,
    ProductoModule,
  ],
  controllers: [AppController, DatabaseTestController],
  providers: [AppService, DatabaseTestService],
})
export class AppModule {}
