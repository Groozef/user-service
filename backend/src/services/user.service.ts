import { Injectable } from '@nestjs/common';
import { DatabaseService } from './db.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllUsers() {
    const query = 'SELECT * FROM users';
    const result = await this.databaseService.query(query);
    return result;
  }

  async updateProblems() {
    const client = await this.databaseService.getClient();
    try {
      await client.query('BEGIN');
      const updateQuery = `
        UPDATE users
        SET problems = false
        WHERE problems = true
        RETURNING *;
      `;
      const updatedUsers = await client.query(updateQuery);
      await client.query('COMMIT');
      return {
        message: 'Updated users with problems set to false',
        count: updatedUsers.rowCount,
      };
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error during transaction', error);
      throw new Error('Failed to update users');
    } finally {
      client.release();
    }
  }

  async getProblemsCount() {
    const query = 'SELECT COUNT(*) FROM users WHERE problems = true';
    const result = await this.databaseService.query(query);
    return { count: result[0].count };
  }

  async toggleProblem(id: number, problems: boolean) {
    const query = `
      UPDATE users
      SET problems = $1
      WHERE id = $2
      RETURNING *;
    `;
    const result = await this.databaseService.query(query, [problems, id]);
    return { message: 'User problem flag updated', user: result[0] };
  }
}
