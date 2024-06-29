import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

@Schema({ collection: 'posts', timestamps: true, versionKey: false })
export class Post {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId!: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Folder' })
  folderId!: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  url!: string;

  @Prop({ required: true })
  title!: string;
  //TODO : 사진 추가

  @Prop({ default: null, type: String })
  description: string | null;

  @Prop({ default: false })
  isFavorite: boolean;

  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: 'PostAIClassification',
  })
  aiClassificationId?: MongooseSchema.Types.ObjectId;
}

export type PostDocument = HydratedDocument<Post>;
export const PostSchema = SchemaFactory.createForClass(Post);
