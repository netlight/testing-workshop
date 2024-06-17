import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Operation } from '@/entity/Operation';

config();

export const AppDataSource =
  process.env.NODE_ENV === 'test'
    ? new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'police',
        synchronize: true,
        logging: false,
        entities: [Operation],
        subscribers: [],
        migrations: [],
      })
    : new DataSource({
        type: 'sqlite',
        database: 'police.sqlite',
        synchronize: true,
        logging: false,
        entities: [Operation],
        subscribers: [],
        migrations: [],
      });
