import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsModule } from './films/films.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthGuard } from './auth/auth.gaurd';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ,],
  imports: [  ConfigModule.forRoot({ isGlobal: true }) , FilmsModule, AuthModule, PrismaModule],
})
export class AppModule {}

