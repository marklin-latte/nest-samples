import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './contexts/adminCreatorManage/users.module';
import * as path from 'path';

@Module({
  imports: [
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
          entities: [
            path.join(__dirname, '/contexts/**/entity', '*.entity.js'),
          ],
          // production 不能開啟
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
