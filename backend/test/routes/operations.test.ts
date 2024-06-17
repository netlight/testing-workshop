import fastify from 'fastify';
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';

import { buildFastify } from '@/app';
import { AppDataSource } from '@/data-source';

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
      // Check out the root.test.ts for some inspiration
      // act
      // TODO: inject the call to /operations into fastify
      //
      // assert
      // TODO: Expect the payload is what we expect
    });
  });

  describe('POST /', () => {
    it.todo('should store a new operation');
  });

  describe('POST /:id/acknowledge', () => {
    it.todo('should acknowledge an operation');
  });
});
