import { FastifyInstance } from 'fastify';

import { OperationService } from '@/application/OperationService';
import { Operation } from '@/entity/Operation';
import { OperationsRepository } from '@/repos/OperationRepo';

export default async function (
  fastify: FastifyInstance,
  options: { operationsRepository: OperationsRepository },
) {
  const { operationsRepository } = options;
  const operationsService = new OperationService(operationsRepository);

  // GET all operations
  fastify.get('/operations', async function () {
    return { results: await operationsService.findAllOperations() };
  });

  // GET specific operation
  fastify.get('/operations/:id', async function (request) {
    const { id } = request.params as { id: string };

    return await operationsService.findOperationById(Number(id));
  });

  // POST acknowledge operation
  fastify.post('/operations/:id/acknowledge', async function (request) {
    const { id } = request.params as { id: string };

    return await operationsService.acknowledgeOperation(Number(id));
  });

  // POST new operation
  fastify.post('/operations', async function (request) {
    const operation = request.body as Operation;

    return await operationsService.createOperation(operation);
  });

  // PUT existing operation
  fastify.put('/operations/:id', async function (request) {
    const operation = request.body as Operation;

    return await operationsService.updateOperation(operation);
  });

  // DELETE existing operation
  fastify.delete('/operations/:id', async function (request) {
    const { id } = request.params as { id: string };

    return await operationsService.deleteOperation(Number(id));
  });

  // GET needs support
  fastify.get('/operations/needs-support', async () => {
    return {
      needsSupport: await operationsService.departmentNeedsSupport(),
    };
  });
}
