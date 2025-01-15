import { Controller, Get } from '@nestjs/common';
import { DatabaseTestService } from './database-test.service';
@Controller('database')
export class DatabaseTestController {
  constructor(private readonly databaseService: DatabaseTestService) {}

  @Get('test')
  async testDatabaseConnection(): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      const result = await this.databaseService.testConnection();
      return { success: true, message: result }; // Respuesta en formato JSON
    } catch (error) {
      return { success: false, message: error.message }; // Respuesta en formato JSON con error
    }
  }
}
