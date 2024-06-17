import { DataSource } from 'typeorm';
import { describe, it } from 'vitest';

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

    // act
    // TODO: Save something in the repo

    // assert
    // TODO: Assert that the repo has the expected contents
  });

  it.todo('should acknowledge an operation');
});
