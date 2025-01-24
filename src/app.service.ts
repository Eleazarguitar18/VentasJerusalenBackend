import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { StreamableFile } from '@nestjs/common';
@Injectable()
export class AppService {
  getHello() {
    return { message: 'Hello World!', autor: 'EleazarDEV' };
  }
  getImage(): StreamableFile {
    const imagePath = join(__dirname, '..', 'public', 'EleazarDEV-Backend.png'); // Ruta de la imagen
    const file = createReadStream(imagePath);
    return new StreamableFile(file);
  }
}
