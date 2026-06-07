import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  HeadBucketCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

@Injectable()
export class MinioService implements OnModuleInit {
  private s3: S3Client;
  constructor() {
    this.s3 = new S3Client({
      endpoint: process.env.MINIO_ENDPOINT || '',
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.MINIO_ROOT_USER || '',
        secretAccessKey: process.env.MINIO_ROOT_PASSWORD || '',
      },
      forcePathStyle: true,
    });
  }

  /** Creates the photos bucket on startup if it does not already exist. */
  async onModuleInit() {
    const bucket = process.env.MINIO_BUCKET || '';
    try {
      await this.s3.send(new HeadBucketCommand({ Bucket: bucket }));
    } catch {
      await this.s3.send(new CreateBucketCommand({ Bucket: bucket }));
    }
  }

  /** Uploads a file to MinIO under jobs/{jobId}/ and returns its public URL. */
  async uploadPhoto(file: Express.Multer.File, jobId: string) {
    const key = `jobs/${jobId}/${Date.now()}-${file.originalname}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: process.env.MINIO_BUCKET || '',
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return `${process.env.MINIO_PUBLIC_URL}/${process.env.MINIO_BUCKET}/${key}`;
  }

  /** Deletes a file from MinIO given its full public URL. */
  async deletePhoto(url: string) {
    const bucket = process.env.MINIO_BUCKET || '';
    const key = url.split(`${bucket}/`)[1];
    await this.s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
  }
}
