import FormData from 'form-data';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import type { AxiosResponse } from 'axios';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiService {
  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  /** Forwards an audio file to the AI service for Whisper transcription + Claude extraction. */
  async voiceToJob(audioBuffer: Buffer, filename: string) {
    const form = new FormData();
    form.append('audio', audioBuffer, filename);

    const start = Date.now();
    const response: AxiosResponse = await firstValueFrom(
      this.httpService.post('http://ai-service:8000/process/voice', form, {
        headers: form.getHeaders(),
      }),
    );

    await this.prisma.aiLog.create({
      data: {
        feature: 'voice-to-job',
        model: 'claude-sonnet-4-6',
        tokens: 0,
        latency: Date.now() - start,
      },
    });

    return response.data;
  }

  /** Sends a job description to the AI service and returns suggested invoice line items. */
  async suggestItems(jobDescription: string, jobType?: string) {
    const start = Date.now();
    const response: AxiosResponse = await firstValueFrom(
      this.httpService.post('http://ai-service:8000/process/suggest-items', {
        jobDescription,
        jobType,
      }),
    );

    await this.prisma.aiLog.create({
      data: {
        feature: 'suggest-items',
        model: 'claude-sonnet-4-6',
        tokens: 0,
        latency: Date.now() - start,
      },
    });
    return response.data;
  }

  /** Sends an image URL to the AI service for Claude vision analysis of a job site photo. */
  async analyzePhoto(imageUrl: string) {
    const start = Date.now();
    const response: AxiosResponse = await firstValueFrom(
      this.httpService.post('http://ai-service:8000/process/analyze-photo', {
        imageUrl,
      }),
    );

    await this.prisma.aiLog.create({
      data: {
        feature: 'analyze-photo',
        model: 'claude-sonnet-4-6',
        tokens: 0,
        latency: Date.now() - start,
      },
    });
    return response.data;
  }

  /** Stores a thumbs-up/down rating for an AI feature response, used as a future fine-tuning signal. */
  async saveFeedback(feature: string, rating: boolean) {
    await this.prisma.aiFeedback.create({
      data: {
        feature,
        rating,
      },
    });
  }

  /** Forwards a natural-language question to the ReAct agent in the AI service and returns the answer. */
  async agent(message: string, token: string) {
    const start = Date.now();
    const response: AxiosResponse = await firstValueFrom(
      this.httpService.post('http://ai-service:8000/agent', { message, token }),
    );

    await this.prisma.aiLog.create({
      data: {
        feature: 'agent',
        model: 'claude-sonnet-4-6',
        tokens: 0,
        latency: Date.now() - start,
      },
    });

    return response.data;
  }
}
