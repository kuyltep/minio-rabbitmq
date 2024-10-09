import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Delete('/:id')
  async deleteFile(@Param('id') id: string) {
    return this.fileService.deleteFileFromMinio(id);
  }
}
