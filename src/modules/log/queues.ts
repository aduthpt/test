import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { Job, JobId, Queue } from "bull";
import { Model } from "mongoose";
@Processor("log")

export class logQueues {
    // private log: any[] = [];
    constructor(
        private configService: ConfigService,
        @InjectQueue("log")
        private readonly logQ: Queue) { }
    @Process("add-log")
    async addlog(job: Job) {
        const size = this.configService.get<string>('LOG_BATCH_SIZE');
        const countJob = await this.logQ.getJobCountByTypes("completed");
       
        if (Number(countJob) >= Number(size)) {
            await this.logQ.pause()
            const cplJob = await this.logQ.getJobs(["completed"]);
            const insertData = await Promise.all(cplJob.map(async job => {
                await job.remove();
                return job.data;
            }));
            // console.log("test", insertData.length);
          
            await this.logQ.resume();

          
            
        }
    }


}
