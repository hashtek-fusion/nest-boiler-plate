import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): string {
    return 'Welcome to NestJS Boilet Plate code. Your API server is up and running!!<br/> <a href="/api/swagger">Go to Swagger API documentation</a>';
  }
}
