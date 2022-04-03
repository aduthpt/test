


import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { string } from 'joi';
import { ConfigService } from '@nestjs/config';
import { combineLatestAll, queueScheduler } from 'rxjs';
import { User, UserDocument } from '../User/User.schema';
import { Log, LogDocument } from './log.schema';
import { CreateUserEvent } from '../User/create-user.event';

@Injectable()
export class LogService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Log.name) private logModel: Model<LogDocument>,
        private configService: ConfigService,
        @InjectQueue("log")
        private readonly logQueue: Queue,) {}
      private readonly analytics: any[] = [];
    
      getHello(): string {
        return 'Hello World!';
      }
    
      async logQ2( data :CreateUserEvent):Promise<User>{
         this.logQueue.add("add-log",data)
          console.log(this.logQueue.count())
          const countJob = await this.logQueue.getJobCountByTypes("completed");
          console.log(countJob);
         this.analytics.push({
          name: data.userCreate.name,
          action: data.userCreate.action, 
          role: data.userCreate.role,
          info: data.userCreate.info,
          time: new Date(),
      });
      const newdata :string[]= this.analytics;
      const size = this.configService.get<string>('LOG_BATCH_SIZE');
      if(newdata.length==(Number(size)+1)){newdata.splice(0,3)}
      if(Number(countJob)==Number(size)){
        console.log("updata")
         return this.userModel.create(newdata);}
    
      }
     async logQ(data: Record<string, unknown>):Promise<Log>{
        //  this.logQueue.add("add-log",data);
         console.log(data)
         return this.logModel.create(data);
      }
    
      getAnalytics() {
        console.log("1")
        return this.analytics;
        
      }
}
