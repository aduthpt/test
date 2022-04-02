import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { ConfigService } from "@nestjs/config";
import { Job, JobId, Queue } from "bull";
@Processor("log")
export class logQueues{
    // private logList: any[] = [];
    constructor(
        private configService: ConfigService,
        @InjectQueue("log") 
        private readonly logQ :Queue){}
    @Process("user_created_")
    async addlog(job :Job <Record<string, unknown>>){
        const size = this.configService.get<string>('LOG_BATCH_SIZE');
        const countJob=await this.logQ.getJobCountByTypes("completed");
        if(Number(countJob)==Number(size)){
            await this.logQ.pause()
        const cplJob =await this.logQ.getJobs(["completed"]);
        const insertData = await Promise.all(cplJob.map(async job => {
            await job.remove();
            return job.data;
        }));
        console.log("test", insertData.length);
        console.log(insertData)
        // await job.remove();
        await this.logQ.resume();
        }
    }
    // async transcode(job: Job<unknown>) {
    //     let data:any=job.data;
    //         console.log(data);
    //     }
       

      }
