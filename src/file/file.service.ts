import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileUploadDto } from './dto/file.body.dto';
import * as path from 'path';
import * as fs from 'fs';
import MinioUtil from 'src/utils/minio.util';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class FileService {
  constructor(
    private readonly configService: ConfigService,
    private readonly minioUtil: MinioUtil,
    private readonly prismaService: PrismaService,
  ) {}
  async uploadFileToMinio(body: FileUploadDto) {
    try {
      const pathToFile = path.join(process.cwd(), body.fileName);
      const stream = fs.createReadStream(pathToFile);
      const fileParts = body.fileName.split('.');
      const objectName = `${fileParts[0]}-${new Date().getTime()}.${fileParts[1]}`;
      await this.minioUtil.minio.putObject(
        this.configService.get('MINIO_BUCKET'),
        objectName,
        stream,
      );
      const url = await this.minioUtil.minio.presignedGetObject(
        this.configService.get('MINIO_BUCKET'),
        objectName,
      );
      // const data = await this.prismaService.file.create({
      //   data: {
      //     name: objectName,
      //     url,

      //   },
      // });
      // return data;
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

  async deleteFileFromMinio(id: string) {
    try {
      await this.prismaService.$transaction(async (tx) => {
        const file = await tx.file.findFirst({
          where: {
            id,
          },
        });
        await this.minioUtil.minio.removeObject(
          this.configService.get('MINIO_BUCKET'),
          file.name,
        );
        await tx.file.delete({
          where: {
            id,
          },
        });
        return { data: 'deleted' };
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
