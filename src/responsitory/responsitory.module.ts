import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/User.schema";

import * as db from "src/responsitory/db_collection";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: db.DB_USER, schema: UserSchema },
                 
        ]),
    ],
    providers: [],
    exports: [MongooseModule],
})
export class RepositoryModule {}
