import { ApiProperty } from '@nestjs/swagger';
import { PaginationQuery } from '@src/common';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetPostQueryDto extends PaginationQuery {
  @ApiProperty({
    description: '읽지 않음 여부',
  })
  @IsOptional()
  @IsBoolean()
  unread?: boolean;
}
