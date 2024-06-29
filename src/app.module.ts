// Nest Packages
import { Module } from '@nestjs/common';

// Custom Packages
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@src/infrastructure';
import { AiModule } from './infrastructure/ai/ai.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { FoldersModule } from './modules/folders/folders.module';
import { LinksModule } from './modules/links/links.module';
import { PostsModule } from './modules/posts/posts.module';
import { AwsLambdaModule } from './infrastructure/aws-lambda/aws-lambda.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
    }),
    DatabaseModule,
    AiModule,
    UsersModule,
    AuthModule,
    FoldersModule,
    LinksModule,
    PostsModule,
    AwsLambdaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
