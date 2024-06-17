import fastify from 'fastify';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { buildFastify } from '@/app';

describe('E2E (root) /', async () => {
  let app: ReturnType<typeof fastify> | undefined = undefined;

  beforeAll(async () => {
    app = await buildFastify();
  });

  afterAll(async () => {
    await app?.close();
  });

  describe('GET /', () => {
    it('GET / should return 200 and content', async () => {
      const res = await app!.inject({
        url: '/',
      });

      expect(JSON.parse(res.payload)).toEqual({ root: true });
    });
  });
});
