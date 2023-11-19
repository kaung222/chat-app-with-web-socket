import { Injectable, Body } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import ffmpeg from 'fluent-ffmpeg';

@Injectable()
export class ProductsService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
  });
  private readonly client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly configService: ConfigService,
  ) {}
  create(createProductDto: CreateProductDto) {
    // return this.productRepository.save(createProductDto);
  }
  async upload(fileName: string, file: Buffer) {
    // const Key = 'main/' + uuidv4() + '.png';
    // const command = new PutObjectCommand({
    //   Bucket: 'quicklearn-admin-direct',
    //   Key,
    //   Body: file,
    // });
    // await this.s3Client.send(command);

    // const command2 = new GetObjectCommand({
    //   Bucket: 'quicklearn-admin-direct',
    //   Key,
    // });

    // return getSignedUrl(this.client, command2);
    const something = ffmpeg('')
      .videoCodec('libx264') // Set the video codec (libx264 is commonly used)
      .audioCodec('aac') // Set the audio codec
      .save('./videos');
    return something;
  }
  async getFiles(fileName?: string) {
    return await this.s3Client.send(
      new ListObjectsV2Command({
        Bucket: 'quicklearn-admin-direct',
        // Key: fileName,
      }),
    );
  }

  findAll() {
    return this.productRepository.find();
  }
  getPresignedUrl = ({ Key, Bucket }) => {
    const client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
    });
    const command = new GetObjectCommand({
      Key,
      Bucket,
    });
    return getSignedUrl(client, command, { expiresIn: 3600 });
  };

  async findOne(id: number) {
    return this.getPresignedUrl({
      Key: 'profile-image-clnu0jyk70007mle5c5sfhas1.png',
      Bucket: 'quicklearn-admin-direct',
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return uuidv4();
  }
}
