import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8000;

  app.enableCors();
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 1000000,
    }),
  );
  await app.listen(port);
  console.log('sever is running', port);
}
bootstrap();
