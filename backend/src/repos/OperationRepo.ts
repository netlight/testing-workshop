import { DataSource } from 'typeorm';

import { Operation } from '@/entity/Operation';

export function getOperationRepo(dataSource: DataSource) {
  return dataSource.getRepository(Operation).extend({
    acknowledgeOperation(id: number) {
      return this.update({ id }, { isAcknowledged: true });
    },
    findById(id: number) {
      return this.findOneBy({ id });
    },
    findAll(): Promise<Operation[]> {
      return this.find();
    },
  });
}

export type OperationsRepository = ReturnType<typeof getOperationRepo>;
