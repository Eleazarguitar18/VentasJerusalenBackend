import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
@Injectable()
export class DatabaseTestService {
  constructor(private readonly dataSource: DataSource) {}

  async testConnection(): Promise<string> {
    try {
      // Verificar si ya hay una conexión activa
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
      }
      return 'Database connection is successful!';
    } catch (error) {
      throw new Error(`Database connection failed: ${error.message}`);
    }
  }
}
