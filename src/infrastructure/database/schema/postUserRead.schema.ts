import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { BaseDocument } from './base.schema';

@Schema({ collection: 'post_user_read', timestamps: true, versionKey: false })
export class PostUserRead extends BaseDocument {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId!: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Post' })
  postId!: MongooseSchema.Types.ObjectId;
}

export type PostUserReadDocument = HydratedDocument<PostUserRead>;
export const PostUserReadSchema = SchemaFactory.createForClass(PostUserRead);
