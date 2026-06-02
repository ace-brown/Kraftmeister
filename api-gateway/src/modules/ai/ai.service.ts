import FormData from 'form-data';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import type { AxiosResponse } from 'axios';

@Injectable()
export class AiService {
  constructor(private readonly httpService: HttpService) {}

  /** Forwards an audio file to the AI service for Whisper transcription + Claude extraction. */
  async voiceToJob(audioBuffer: Buffer, filename: string) {
    const form = new FormData();
    form.append('audio', audioBuffer, filename);

    const response: AxiosResponse = await firstValueFrom(
      this.httpService.post('http://ai-service:8000/process/voice', form, {
        headers: form.getHeaders(),
      }),
    );

    return response.data;
  }

  /** Sends a job description to the AI service and returns suggested invoice line items. */
  async suggestItems(jobDescription: string, jobType?: string) {
    const response: AxiosResponse = await firstValueFrom(
      this.httpService.post('http://ai-service:8000/process/suggest-items', {
        jobDescription,
        jobType,
      }),
    );
    return response.data;
  }

  /** Sends an image URL to the AI service for Claude vision analysis of a job site photo. */
  async analyzePhoto(imageUrl: string) {
    const response: AxiosResponse = await firstValueFrom(
      this.httpService.post('http://ai-service:8000/process/analyze-photo', {
        imageUrl,
      }),
    );

    return response.data;
  }
}
