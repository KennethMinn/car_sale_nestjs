import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //to use Dto validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // will neglect the extra request fields
    }),
  );
  await app.listen(3000);
}
bootstrap();
