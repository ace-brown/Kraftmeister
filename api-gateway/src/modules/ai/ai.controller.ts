/// <reference types="multer" />
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AiService } from './ai.service';

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
  async suggestItems(
    @Body() payload: { jobDescription: string; jobType?: string },
  ) {
    return this.aiService.suggestItems(payload.jobDescription, payload.jobType);
  }

  /** Accepts an image URL, sends it to Claude vision, and returns detected issues and suggested tasks. */
  @Post('analyze-photo')
  async analyzePhoto(@Body() payload: { imageUrl: string }) {
    return this.aiService.analyzePhoto(payload.imageUrl);
  }
}
