import { CreateUser } from './create-user';
// import { User } from './User.schema';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserEvent } from './create-user.event';
import { User } from './User.schema';
import { InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, 
    // @InjectQueue('log') readonly queue: Queue
    ) 
    {}




  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('user_created')
  @Post()
   CreateUser(@Body() user :CreateUserEvent  ): Promise<User> {
    console.log('data')
    return  this.appService.UserCreated(user) ;
  }
  //   @EventPattern('user_created')
  // async handleUserCreated(data: Record<string, unknown>) {
  //      console.log(data)
  //   const job: Job = await this.queue.add(data);
  //     console.log(job);
  //     console.log(data)
  // }
//   @EventPattern('user_created')
//   @Post()
//   async addLog(@Body() data: Record<string, unknown>) {
//     return await this.appService.logQ(data);
//           console.log(data)
   
// }
@Post()
  @EventPattern('user_created_')
    addLog(@Body()data: Record<string, unknown>) :Promise<User>
{
       return this.appService.logQ(data);

    }
  
  @MessagePattern({ cmd: 'get_analytics' })
  getAnalytics() {
    const a= this.appService.getAnalytics;
    console.log(a.length)
    return this.appService.getAnalytics();
    
  }

}


