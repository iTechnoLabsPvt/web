import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as moment from 'moment';
import * as bodyParser from 'body-parser';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
dotenv.config();

const server = express();
// route that helps google check the health of the server.
server.get('/_ah/warmup', (req, res) => {
  res.send('..... warm up okay .....');
  // Handle your warmup logic. Initiate db connection, etc.
});

server.get('/_ah/health', (req, res) =>
  res.send('...... server health is okay ......'),
);

server.get('/_ah/start', (req, res) => res.send('started'));

server.get('/', (req, res) =>
  res.send(`Antenna is live - ${moment().toDate()})`),
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Antenaa')
    .setDescription('Antenaa')
    .setVersion('1.0')
    .addTag('antenaa')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
