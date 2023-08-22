import {  Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private config: ConfigService) {
    // .env variables are available in the config service
    const url = config.get<string>('DATABASE_URL');
    // inject the database url into the Prisma Client constructor
    super({ datasources: { db: { url } } });
  }
}