
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { logQueues } from './modules/log/queues';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Log, LogSchema } from './modules/log/log.schema';
import { LogModule } from './modules/log/log.module';
import { User, UserSchema } from './modules/User/User.schema';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
  }),
    MongooseModule.forRoot('mongodb://localhost/demo9') , 
  MongooseModule.forFeature([{name: User.name, schema: UserSchema},{name: Log.name, schema: LogSchema}]),

  BullModule.forRoot( {
    redis:{
 
      host: process.env.REDIS_HOST,
      port :parseInt(process.env.REDIS_PORT, 10) ,
      password: process.env.PASSWORD_HOST,
      
    }
  }),
  LogModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
