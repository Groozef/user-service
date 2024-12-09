import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../services/db.service';

@Injectable()
export class MigrationService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createMockUsers() {
    const numberOfUsers = 1000000; // Указываем количество пользователей

    const values = Array.from({ length: numberOfUsers }).map((_, index) => {
      const firstName = `FirstName${index}`;
      const lastName = `LastName${index}`;
      const age = Math.floor(Math.random() * 100);
      const gender = Math.random() > 0.5 ? 'Male' : 'Female';
      const problems = Math.random() > 0.7; // случайно выставляем флаг проблемы

      return `('${firstName}', '${lastName}', ${age}, '${gender}', ${problems})`;
    });

    const query = `
      INSERT INTO users (first_name, last_name, age, gender, problems)
      VALUES ${values.join(', ')};
    `;

    await this.databaseService.query(query);
    return { message: 'Mock users created successfully' };
  }
}
