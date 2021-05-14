import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { v4 } from 'uuid';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
      resave: false,
      cookie: {
        maxAge: 10000,
      },
    }),
  );
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
