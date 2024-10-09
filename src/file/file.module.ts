import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { ConfigService } from '@nestjs/config';
import MinioUtil from 'src/utils/minio.util';

@Module({
  controllers: [FileController],
  providers: [FileService, ConfigService, MinioUtil],
})
export class FileModule {}
