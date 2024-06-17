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
    expect(await repo.findAll()).toHaveLength(0);

    // act
    await repo.save(operation);

    // assert
    const allResults = await repo.findAll();
    expect(allResults).toHaveLength(1);
    expect(allResults[0]).toEqual(operation);
  });

  it('should acknowledge an operation', async () => {
    // arrange
    const repo = await setupRepo();
    const operation = mockOperation();
    await repo.save(operation);

    // act
    await repo.acknowledgeOperation(operation.id);

    // assert
    expect(await repo.findById(operation.id)).toEqual({
      ...operation,
      isAcknowledged: true,
    });
  });
});
