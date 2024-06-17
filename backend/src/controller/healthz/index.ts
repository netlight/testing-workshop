import { FastifyInstance } from 'fastify';

import { AppDataSource } from '@/data-source';

export default async function (fastify: FastifyInstance) {
  // GET all operations
  fastify.get('/healthz', async function () {
    if (!AppDataSource.isInitialized) {
      throw new Error('Database is not initialized');
    }

    return { status: 'OK' };
  });
}
