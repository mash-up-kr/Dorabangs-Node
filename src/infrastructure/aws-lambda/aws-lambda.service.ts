import { Injectable } from '@nestjs/common';
import { InvokeCommand, LambdaClient, LogType } from '@aws-sdk/client-lambda';
@Injectable()
export class AwsLambdaService {
  // TODO  credentials 추가 필요 (acccess_key, secret_key)
  readonly client = new LambdaClient({ region: 'ap-northeast-2' });

  invoke_lambda(lambdaFunctionName: string, payload: Object): void {
    const command = new InvokeCommand({
      FunctionName: lambdaFunctionName,
      InvocationType: 'Event',
      Payload: JSON.stringify(payload),
    });
    this.client.send(command);
  }
}
