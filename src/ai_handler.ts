import { Context, Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AiModule } from '@src/infrastructure/ai/ai.module';
import { AiService } from '@src/infrastructure/ai/ai.service';

export const handler: Handler = async (event: any) => {
  const data = JSON.parse(event.body);
  // event 데이터 잘 들어오는지 확인용
  console.log(data);
  const app = await NestFactory.create(AiModule);
  const aiService = app.get(AiService);

  // NOTE: AI 요약 요청
  const summarizeUrlContent = await aiService.summarizeLinkContent(
    data.postContent,
    data.folderList,
  );

  if (summarizeUrlContent.success === true) {
    return true;
    // TODO create row PostAIClassification
  }
};
