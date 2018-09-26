import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ConfigModule} from './config/config.module';
import {EnvProperties} from './config/env-properties.model';
import {ENV_CONFIG_TOKEN} from './config/constants';
import { MulterModule, Logger } from '@nestjs/common';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  // Set helmet,csurf middlewares to protect against security vulnerabilities
  app.use(helmet());
  app.use(cookieParser()); // Cookie parser or session should get initialized first to use csrf module
  app.use(csurf({cookie: true}));

  // set path to send CSRF token to pass in subsequent requests from client TO-DO:: will be changed later and set via login sucess path
  app.use('/api/csrf', (req, res) => {
    const token = req.csrfToken();
    // res.cookie('X-CSRF-TOKEN', token);
    res.json({csrfToken: token});
  });

  // read environment properties file
  const props: EnvProperties = app.select(ConfigModule).get(ENV_CONFIG_TOKEN);

  // Register Multer Module to support File Uploads
  MulterModule.registerAsync({
    useFactory:  () => ({
      dest: props.multer.dest,
    }),
  });

  // set swagger options
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Nest JS Boiler Plate Code')
    .setDescription('REST APIs to manage an application')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Manage Registration & Users')
    .addTag('Manage Notifications')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  // Swagger setup by providing api route
  SwaggerModule.setup('api/swagger', app, swaggerDocument);

  await app.listen(props.server.port);
}
bootstrap();
