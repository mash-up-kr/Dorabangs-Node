import { Module } from '@nestjs/common';
import { AwsLambdaService } from './aws-lambda.service';

@Module({
  providers: [AwsLambdaService],
  exports: [AwsLambdaService],
})
export class AwsLambdaModule {}
