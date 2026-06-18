/// <reference types="multer" />
import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AiService } from './ai.service';
import { SuggestItemsDto } from './dtos/suggest-items.dto';
import { AnalyzePhotoDto } from './dtos/analyze-photo.dto';
import { FeedbackDto } from './dtos/feedback.dto';
import { AgentDto } from './dtos/agent.dto';

@ApiBearerAuth()
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  /** Accepts an audio file, transcribes it with Whisper, and returns structured job note fields via Claude. */
  @Post('voice-to-job')
  @UseInterceptors(FileInterceptor('audio'))
  async voiceToJob(@UploadedFile() file: Express.Multer.File) {
    return this.aiService.voiceToJob(file.buffer, file.originalname);
  }

  /** Accepts a job description and optional job type, returns AI-suggested invoice line items. */
  @Post('suggest-items')
  async suggestItems(@Body() payload: SuggestItemsDto) {
    return this.aiService.suggestItems(payload.jobDescription, payload.jobType);
  }

  /** Accepts an image URL, sends it to Claude vision, and returns detected issues and suggested tasks. */
  @Post('analyze-photo')
  async analyzePhoto(@Body() payload: AnalyzePhotoDto) {
    return this.aiService.analyzePhoto(payload.imageUrl);
  }

  /** Stores a thumbs-up/down rating for an AI result, used as a future fine-tuning signal. */
  @Post('feedback')
  async saveFeedback(@Body() payload: FeedbackDto) {
    return this.aiService.saveFeedback(payload.feature, payload.rating);
  }

  /** Accepts a natural-language question and returns an AI-generated answer by proxying to the ReAct agent. */
  @Post('agent')
  async agent(@Body() payload: AgentDto, @Req() req: Request) {
    const token = req.headers['authorization'] ?? '';
    return this.aiService.agent(payload.message, token);
  }
}
