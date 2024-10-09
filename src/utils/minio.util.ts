import * as Minio from 'minio';
export default class MinioUtil {
  constructor() {
    this.minio = new Minio.Client({
      endPoint: 'localhost',
      accessKey: process.env.MINIO_ACCESS!,
      secretKey: process.env.MINIO_SECRET!,
      useSSL: false,
      port: Number(process.env.MINIO_PORT!),
    });
  }
  public minio: Minio.Client;
}
