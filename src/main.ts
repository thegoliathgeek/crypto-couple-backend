import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
try {
  bootstrap();
} catch (e) {
  console.log(`Error : ${e.message}`);
}
