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
      });

      // assert
      expect(JSON.parse(res.payload)).toEqual({
        results: [],
      });
    });
  });

  describe('POST /', () => {
    it('should store a new operation', async () => {
      // arrange
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...operation } = mockOperation();

      // act
      const res = await app!.inject({
        url: '/operations',
        method: 'POST',
        payload: operation,
      });

      // assert
      expect(JSON.parse(res.payload)).toEqual(
        expect.objectContaining(operation),
      );
    });
  });

  describe('POST /:id/acknowledge', () => {
    it('should acknowledge an operation', async () => {
      // arrange
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...operation } = mockOperation({ isAcknowledged: false });
      const saveResult = await app!.inject({
        url: '/operations',
        method: 'POST',
        payload: operation,
      });
      const storedId = JSON.parse(saveResult.payload).id;

      // act
      await app!.inject({
        url: `/operations/${storedId}/acknowledge`,
        method: 'POST',
      });

      // assert
      const res = await app!.inject({
        url: `/operations/${storedId}`,
        method: 'GET',
      });
      expect(JSON.parse(res.payload)).toEqual({
        ...operation,
        id: storedId,
        isAcknowledged: true,
      });
    });
  });
});
