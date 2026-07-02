import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: 'https://restaurant-system-eight-pi.vercel.app',
  });

  await app.listen(4000, '0.0.0.0');

  console.log('🚀 Server running at http://localhost:4000');
}

bootstrap();