import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { RouterModule } from 'nest-router';
import { routers } from './app.routes';
import { PublicModule } from './modules/public/public.module';
import { TenantedModule } from './modules/tenanted/tenanted.module';
import { GlobalModule } from './modules/global/global.module';

@Module({
  imports: [
    RouterModule.forRoutes(routers),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/.env.${process.env.NODE_ENV}`,
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('db.host'),
          port: config.get<number>('db.port'),
          username: config.get('db.username'),
          password: config.get('db.password'),
          database: config.get('db.name'),
          entities: [path.join(__dirname, '/modules/**/entity', '*.entity.js')],
          migrations: [path.join(__dirname, './migrations/public/*{.ts,.js}')],
          migrationsRun: true,
        };
      },
      inject: [ConfigService],
    }),
    PublicModule,
    GlobalModule,
    TenantedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
