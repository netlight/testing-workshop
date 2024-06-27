import fastify from 'fastify';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { buildFastify } from '@/app';
import { AppDataSource } from '@/data-source';
import { mockOperation } from '@/entity/Operation.mock';

describe('E2E /operations', async () => {
  let app: ReturnType<typeof fastify> | undefined = undefined;

  beforeAll(async () => {
    app = await buildFastify();
  });

  beforeEach(async () => {
    await AppDataSource.synchronize(true);
  });

  afterAll(async () => {
    await app?.close();
  });

  describe('GET /', () => {
    it('should return 200 and content', async () => {
      // act
      const res = await app!.inject({
        url: '/operations',
        method: 'GET',
      });

      // assert
      expect(JSON.parse(res.payload)).toEqual({ results: [] });
    });
  });

  describe('POST /', () => {
    it('should store a new operation', async () => {
      // arrange
      const operation = mockOperation();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...operationWithoutId } = operation;

      // act
      const res = await app!.inject({
        url: '/operations',
        method: 'POST',
        body: operation,
      });

      // assert
      expect(JSON.parse(res.payload)).toEqual(
        expect.objectContaining(operationWithoutId),
      );
    });
  });

  describe('POST /:id/acknowledge', () => {
    it.todo('should acknowledge an operation');
  });
});
