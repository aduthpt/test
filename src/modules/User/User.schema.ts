import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEnum, IsString } from 'class-validator';
export type UserDocument = User & Document;
@Schema()
export class User {

      @IsString()
  @Prop({ type :IsString, required: true })
    name: string;
    @IsString()
    @Prop({ type :IsString, required: true })
    action: string;
    @IsString()
    @Prop({ type :IsString, required: true })
    role: string;
    @IsString()
    @Prop({ type :IsString, required: true })
    info:string;
    @IsString()
    @Prop({ type :IsString, required: true })
    time :string;

}
export const UserSchema = SchemaFactory.createForClass(User);