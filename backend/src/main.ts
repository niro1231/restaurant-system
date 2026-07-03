import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: 'http://foodie-front.s3-website.ap-south-1.amazonaws.com',
  });

  await app.listen(4000, '0.0.0.0');

  console.log('🚀 Server running at http://localhost:4000');
}

bootstrap();