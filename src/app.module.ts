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
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'), // Esta es la ruta a la carpeta public
    // }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Tipo de base de datos
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Rutas de entidades
        schema: configService.get<string>('DB_SCHEMA'),
        synchronize:
          true /* configService.get<boolean>('DB_SYNCHRONIZE', false) */, // Sincronización automática (no en producción)
        // ssl: {
        //   rejectUnauthorized: false, // Desactiva validación estricta para certificados autofirmados
        // },
      }),
    }),
    UsersModule,
    PersonaModule,
    ClienteModule,
    ProductoModule,
    AuthModule,
  ],
  controllers: [AppController, DatabaseTestController],
  providers: [AppService, DatabaseTestService],
})
export class AppModule {}
