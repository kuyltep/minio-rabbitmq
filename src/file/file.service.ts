import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileUploadDto } from './dto/file.body.dto';
import * as path from 'path';
import * as fs from 'fs';
import MinioUtil from 'src/utils/minio.util';
@Injectable()
export class FileService {
  constructor(
    private readonly configService: ConfigService,
    private readonly minioUtil: MinioUtil,
  ) {}
  async uploadFileToMinio(body: FileUploadDto) {
    try {
      const pathToFile = path.join(process.cwd(), body.fileName);
      const stream = fs.createReadStream(pathToFile);
      const fileParts = body.fileName.split('.');
      const objectName =
        fileParts[0] + '-' + new Date().getTime() + '.' + fileParts[1];
      const data = await this.minioUtil.minio.putObject(
        this.configService.get('MINIO_BUCKET'),
        objectName,
        stream,
      );
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getListOfObjectsMinio() {
    try {
      const result = await this.minioUtil.minio.listObjects('files', '', true);
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteFileFromMinio(body: FileUploadDto) {
    try {
      await this.minioUtil.minio.removeObject(
        this.configService.get('MINIO_BUCKET'),
        body.fileName,
      );
      return { data: 'deleted' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
