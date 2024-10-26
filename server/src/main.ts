import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ORIGIN, PORT } from './constants/env.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.getHttpAdapter().getInstance().disable('x-powered-by'); //disables 'x-powered-by' in headers for stronger security
  app.use(cookieParser()); //vital for cookies work
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //strips out any properties that do not exist in the DTO.
    }),
  );
  app.enableCors({
    origin: configService.get(ORIGIN),
    credentials: true, //allows the browser to include cookies and other credentials in cross-origin requests
    exposedHeaders: 'set-cookie', //allows client-side scripts to read the set-cookie header in cross-origin requests
  });
  app.setGlobalPrefix('/api');

  await app.listen(configService.get(PORT) | 3001);
}
bootstrap();
