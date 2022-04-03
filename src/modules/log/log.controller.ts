import { Body, Controller, Post } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateUserEvent } from '../User/create-user.event';
import { User } from '../User/User.schema';
import { LogService } from './log.service';

@Controller()
export class LogController {
constructor(private readonly logService: LogService, ) { }
  @EventPattern("add-log")
  @Post()
    addLog(data: Record<string, unknown>){
      return  this.logService.logQ(data);
    }
    
  @EventPattern("add-log")
  @Post()
    addLog1(@Body() user: CreateUserEvent): Promise<User> {
    return this.logService.logQ2(user);
  }


  @MessagePattern({ cmd: 'get_analytics' })
  getAnalytics() {
    const a = this.logService.getAnalytics;
    console.log(a.length)
    return this.logService.getAnalytics();

  }
}
