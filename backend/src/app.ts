import cors from '@fastify/cors';
import fastify from 'fastify';

import Healtz from '@/controller/healthz';
import Operations from '@/controller/operations';
import Root from '@/controller/root';

import { AppDataSource } from './data-source';
import { getOperationRepo } from './repos/OperationRepo';

export async function buildFastify() {
  const server = fastify();
  await server.register(cors);
  const dataSource = await AppDataSource.initialize();

  const operationsRepository = getOperationRepo(dataSource);

  // register all route handlers
  Root(server);
  Operations(server, { operationsRepository });
  Healtz(server);

  return server;
}
