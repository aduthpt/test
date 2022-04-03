import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEnum, IsString } from 'class-validator';
export type LogDocument = Log & Document;
@Schema()
export class Log {
    @Prop(raw({
        serviceId: { type: String },
        name: { type: String },
        action:{ type: String },
        role:{ type: String },
        info:{ type: String },
      }))
      data: Record<string, any>;
}

export const LogSchema = SchemaFactory.createForClass(Log);