import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Monthly Finance')
    .setDescription('Keep track of your monthy finances.')
    .setVersion('1.0')
    // .addTag('your-tag')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'userId',
        in: 'header',
      },
      'userId',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
