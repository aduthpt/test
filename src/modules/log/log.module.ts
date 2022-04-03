import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogController } from './log.controller';
import { Log, LogSchema } from './log.schema';
import { LogService } from './log.service';
import { logQueues } from './queues';

@Module({
  imports: [ 
    MongooseModule.forFeature([{name: Log.name, schema: LogSchema}]),
    BullModule.registerQueue({
    name: "log",
  }),
  ],
  controllers: [LogController],
  providers: [LogService, logQueues]
})
export class LogModule {}
