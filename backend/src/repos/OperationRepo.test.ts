import { DataSource } from 'typeorm';
import { describe, expect, it } from 'vitest';

import { mockOperation } from '@/entity/Operation.mock';

import { Operation } from '../entity/Operation';
import { getOperationRepo } from './OperationRepo';

describe('OperationRepo', () => {
  async function setupRepo() {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [Operation],
      subscribers: [],
      migrations: [],
    });
    await dataSource.initialize();
    return getOperationRepo(dataSource);
  }

  it('should store and find an operation', async () => {
    // arrange
    const repo = await setupRepo();
    const operation = mockOperation();

    // act
    const savedOperation = await repo.save(operation);

    // assert
    const result = await repo.findById(savedOperation.id);
    expect(result).toEqual({ ...operation, id: savedOperation.id });
  });

  it('should acknowledge an operation', async () => {
    // arrange
    const repo = await setupRepo();
    const operation = mockOperation();
    const savedOperation = await repo.save(operation);

    // act
    await repo.acknowledgeOperation(savedOperation.id);

    // assert
    const result = await repo.findById(savedOperation.id);
    expect(result.isAcknowledged).toBe(true);
  });
});
