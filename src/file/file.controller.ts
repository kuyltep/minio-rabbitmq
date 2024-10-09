import { Body, Controller, Get, Post } from '@nestjs/common';
import { FileService } from './file.service';
import { FileUploadDto } from './dto/file.body.dto';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post('/upload')
  async uploadFileToMinio(@Body() body: FileUploadDto) {
    return this.fileService.uploadFileToMinio(body);
  }

  @Get('/list')
  async getListOfObjects() {
    return this.fileService.getListOfObjectsMinio();
  }
}
