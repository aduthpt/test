
// import { CreateUser } from './create-user-request.dto';
import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './create-user.event';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User, UserDocument } from './User.schema';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { string } from 'joi';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
    @InjectQueue("log")
    private readonly logQueue: Queue,) {}
  private readonly analytics: any[] = [];

  getHello(): string {
    return 'Hello World!';
  }


  async logQ(data: Record<string, unknown>):Promise<User>{
    this.logQueue.add("user_created_",data);
    this.analytics.push(data);
    const newdata:string[] = this.analytics;
    console.log((this.analytics))
    let json = JSON.stringify(this.analytics); 
    console.log(json)
    return this.userModel.create(newdata);

  }

   


  UserCreated( data:CreateUserEvent):Promise<User> {
     this.analytics.push({
      name: data.userCreate.name,
      action: data.userCreate.action, 
      role: data.userCreate.role,
      info: data.userCreate.info,
      time: new Date(),
  });

  const size = this.configService.get<string>('LOG_BATCH_SIZE');
    const newdata:string[] = this.analytics;
    if(this.analytics.length===Number(size)+1){
          this.analytics.length=1;
          // this.analytics.splice(1,Number(4))  
        }
      console.log(newdata.length)
         if(newdata.length===Number(size))   {
           console.log('up data')
    return this.userModel.create(newdata);
         }
}
  getAnalytics() {
    console.log("1")
    return this.analytics;
  
  }
}
