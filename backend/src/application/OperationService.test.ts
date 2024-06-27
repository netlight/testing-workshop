import { describe, expect, it, vi } from 'vitest';

import { Operation } from '@/entity/Operation';
import { mockOperation } from '@/entity/Operation.mock';
import { OperationsRepository } from '@/repos/OperationRepo';

import { OperationService } from './OperationService';

describe('OperationService', () => {
  it('should find all operations', async () => {
    // arrange
    const operations: Array<Operation> = [mockOperation()];
    const repo: Partial<OperationsRepository> = {
      findAll: vi.fn().mockResolvedValue(operations),
    };
    const service = new OperationService(repo as OperationsRepository);

    // act
    const result = await service.findAllOperations();

    // assert
    expect(result).toEqual(operations);
    expect(repo.findAll).toHaveBeenCalledOnce();
  });

  it.todo('should find one operation');

  it.todo('should create a new operation');

  it.todo('should update a new operation');

  it.todo('should delete an operation');

  it.todo('should acknowledge an operation');

  it('should throw an error if an operation is already acknowledged', async () => {
    // arrange
    const operation = mockOperation({ isAcknowledged: true });
    const repo: Partial<OperationsRepository> = {
      findById: vi.fn().mockResolvedValue(operation),
      acknowledgeOperation: vi.fn(),
    };
    const service = new OperationService(repo as OperationsRepository);

    // act
    expect(() =>
      service.acknowledgeOperation(operation.id),
    ).rejects.toThrowError();
  });

  const needsSupportCases = [
    // not acknowledged operations count, acknowledged operations count, expected result
    { notAcknowledged: 0, all: 30, expectedResult: false },
    { notAcknowledged: 14, all: 30, expectedResult: false },
    { notAcknowledged: 15, all: 30, expectedResult: true },
    { notAcknowledged: 30, all: 30, expectedResult: true },
  ];

  it.each(needsSupportCases)(
    'when $notAcknowledged out of $all operations are not acknowledged, departmentNeedsSupport should return $expectedResult',
    async ({ notAcknowledged, all, expectedResult }) => {
      // arrange
      const repo: Partial<OperationsRepository> = {
        findAll: vi
          .fn()
          .mockResolvedValue([
            ...Array.from({ length: notAcknowledged }).map(() =>
              mockOperation({ isAcknowledged: false }),
            ),
            ...Array.from({ length: all - notAcknowledged }).map(() =>
              mockOperation({ isAcknowledged: true }),
            ),
          ]),
      };
      const service = new OperationService(repo as OperationsRepository);

      // act
      const result = await service.departmentNeedsSupport();

      //assert
      expect(result).toBe(expectedResult);
    },
  );
});
