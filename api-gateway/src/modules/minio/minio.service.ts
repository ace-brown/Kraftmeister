import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class MinioService {
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
}
