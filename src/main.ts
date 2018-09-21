import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ConfigModule} from './config/config.module';
import {EnvProperties} from './config/env-properties.model';
import {ENV_CONFIG_TOKEN} from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // read environment properties file
  const props: EnvProperties = app.select(ConfigModule).get(ENV_CONFIG_TOKEN);

  // set swagger options
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Nest JS Boiler Plate Code')
    .setDescription('REST APIs to manage an application')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Registration and Login')
    .addTag('Manage Users')
    .addTag('Manage Notifications')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  // Swagger setup by providing api route
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(props.server.port);
}
bootstrap();
