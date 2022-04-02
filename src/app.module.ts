// import { logQueues } from './queues';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from "src/User.schema"
import { BullModule } from '@nestjs/bull';
import { logQueues } from './queues';
import { ConfigModule, ConfigService } from '@nestjs/config';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
  }),
    MongooseModule.forRoot('mongodb://localhost/demo9') , 
  MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  BullModule.forRoot( {
    redis:{
      // host: "localhost",
      // port :3001 ,
      // password: "password",
      host: process.env.REDIS_HOST,
      port :parseInt(process.env.REDIS_PORT, 10) ,
      password: process.env.PASSWORD_HOST,
      
    }
  }),
  BullModule.registerQueue({
    name: "log",
  }),
],
  controllers: [AppController],
  providers: [AppService,logQueues ],
})
export class AppModule {}
