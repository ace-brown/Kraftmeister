import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AgentDto {
  @ApiProperty({ example: 'How many open jobs do I have this week?' })
  @IsNotEmpty()
  message!: string;
}
