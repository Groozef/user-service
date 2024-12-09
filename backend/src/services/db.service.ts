import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DatabaseService {
  private client: Client;

  constructor() {
    const connectionString = process.env.DB_URL_CONNECTION;

    if (!connectionString) {
      throw new Error('Connection string is not defined in .env file');
    }

    this.client = new Client({
      connectionString,
    });

    this.client.connect().catch(err => {
      console.error('Failed to connect to database', err);
    });
  }

  getClient() {
    return this.client;
  }

  async query(text: string, params: any[] = []) {
    const res = await this.client.query(text, params);
    return res.rows;
  }

  async close() {
    await this.client.end();
  }
}
