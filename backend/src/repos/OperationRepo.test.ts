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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const repo = await setupRepo();
    const operation = mockOperation();

    // act
    await repo.save(operation);

    // assert
    const result = await repo.findAll();
    expect(result).toEqual([operation]);
  });

  it.todo('should acknowledge an operation');
});
