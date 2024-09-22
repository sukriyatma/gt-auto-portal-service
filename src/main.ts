import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionHandler } from './common/exception/global-exception-handler';
import 'dotenv/config';
import configuration from './common/config/configuration';
import { otelSDK } from './tracing';
import { TraceInterceptor } from './common/interceptor/trace.interceptor';

declare const module: any;

async function bootstrap() {

  otelSDK.start();

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'fatal', 'error', 'debug', 'warn', 'verbose']
  });

  app.enableCors({
    origin: "*",
    methods: ["GET", "POST",  "PUT", "DELETE", "OPTION"]
  })
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionHandler());
  app.useGlobalInterceptors(new TraceInterceptor());
  
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close())
  }

  await app.listen(configuration().port);
}
bootstrap();
