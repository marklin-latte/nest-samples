import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { tenancyMiddleware } from './modules/global/tenancy/tenancy.middleware';
import { DataSource } from 'typeorm';
import configuration from './config/configuration';
import { WinstonModule } from 'nest-winston';
import winstonConfig from './config/winston.config';

async function bootstrap() {
  // 在 app 開啟前，要先將資料庫的 public schema 建好。
  // 無法直接寫在 migration 裡，因為 app module 的 migration 那
  // 一定要指定 schema
  const connection: DataSource = new DataSource({
    ...configuration().db,
    type: 'postgres',
  });
  await connection.initialize();
  await connection.query(`CREATE SCHEMA IF NOT EXISTS "public"`);
  await connection.destroy();

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig()),
  });
  app.use(tenancyMiddleware);

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('CMS')
    .setDescription('The CMS API description')
    .setVersion('1.0')
    .addTag('cms')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.listen(3000);
}
bootstrap();
