import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nestblog'),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
