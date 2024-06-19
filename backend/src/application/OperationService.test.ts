import { describe, expect, it, vi } from 'vitest';

import { Operation } from '@/entity/Operation';
import { mockOperation } from '@/entity/Operation.mock';
import { OperationsRepository } from '@/repos/OperationRepo';

import { OperationService } from './OperationService';

describe('OperationService', () => {
  function createMockRepository(
    overrides?: Partial<OperationsRepository>,
  ): OperationsRepository {
    return {
      ...overrides,
    } as OperationsRepository;
  }

  it('should find all operations', async () => {
    // arrange
    const operation = mockOperation();
    const findAll = vi.fn().mockReturnValue([operation]);
    const service = new OperationService(
      createMockRepository({
        findAll,
      }),
    );

    // act
    const result = await service.findAllOperations();

    // assert
    expect(result).toEqual([operation]);
    expect(findAll).toHaveBeenCalled();
  });

  it('should find one operation', async () => {
    // arrange
    const operation = mockOperation();
    const findById = vi.fn().mockReturnValue(operation);
    const service = new OperationService(
      createMockRepository({
        findById,
      }),
    );

    // act
    const result = await service.findOperationById(operation.id);

    // assert
    expect(result).toEqual(operation);
    expect(findById).toHaveBeenCalledWith(operation.id);
  });

  it('should create a new operation', async () => {
    // arrange
    const operation = mockOperation();
    const save = vi.fn((value) => value);
    const service = new OperationService(
      createMockRepository({
        save,
      }),
    );

    // act
    const result = await service.createOperation(operation);

    // assert
    expect(result).toEqual(operation);
    expect(save).toHaveBeenCalledWith(operation);
  });

  it('should update a new operation', async () => {
    // arrange
    const operation = mockOperation();
    const allOperations: Operation[] = [];
    const update = vi.fn((value) => {
      allOperations.push(operation);
      return value;
    });
    const findById = vi.fn((id) =>
      allOperations.find((operation) => operation.id === id),
    );
    const service = new OperationService(
      createMockRepository({
        update,
        findById,
      }),
    );

    // act
    await service.updateOperation(operation);

    // assert
    expect(update).toHaveBeenCalledWith({ id: operation.id }, operation);
    expect(findById).toHaveBeenCalledWith(operation.id);
  });

  it('should delete an operation', async () => {
    // arrange
    const operation = mockOperation();
    const del = vi.fn();
    const service = new OperationService(
      createMockRepository({
        delete: del,
      }),
    );

    // act
    await service.deleteOperation(operation.id);

    // assert
    expect(del).toHaveBeenCalledWith({ id: operation.id });
  });

  it('should acknowledge an operation', async () => {
    // arrange
    const operation = mockOperation({ isAcknowledged: false });
    const findById = vi.fn().mockReturnValue(operation);
    const acknowledgeOperation = vi.fn();
    const service = new OperationService(
      createMockRepository({
        findById,
        acknowledgeOperation,
      }),
    );

    // act
    await service.acknowledgeOperation(operation.id);

    // assert
    expect(findById).toHaveBeenCalledWith(operation.id);
    expect(acknowledgeOperation).toHaveBeenCalledWith(operation.id);
  });

  it('should throw an error if an operation is already acknowledged', async () => {
    // arrange
    const operation = mockOperation({ isAcknowledged: true });
    const findById = vi.fn().mockReturnValue(operation);
    const acknowledgeOperation = vi.fn();
    const service = new OperationService(
      createMockRepository({
        findById,
        acknowledgeOperation,
      }),
    );

    // act
    expect(
      async () => await service.acknowledgeOperation(operation.id),
    ).rejects.toThrow('This operation is already acknowledged');
  });

  const needsSupportCases: Array<[number, number, boolean]> = [
    [10, 30, false],
    [0, 0, false],
    [15, 30, true],
    [16, 30, true],
    [30, 30, true],
  ];

  it.each(needsSupportCases)(
    'when %s out of %s operations are not acknowledged, departmentNeedsSupport should return %s',
    async (
      notAcknowledgedOperationsCount,
      totalOperationsCount,
      expectedResult,
    ) => {
      // arrange
      const notAcknowledgedOperations = Array.from({
        length: notAcknowledgedOperationsCount,
      }).map(() => mockOperation({ isAcknowledged: false }));
      const acknowledgedOperations = Array.from({
        length: totalOperationsCount - notAcknowledgedOperationsCount,
      }).map(() => mockOperation({ isAcknowledged: true }));

      const findAll = vi
        .fn()
        .mockReturnValue([
          ...notAcknowledgedOperations,
          ...acknowledgedOperations,
        ]);
      const service = new OperationService(
        createMockRepository({
          findAll,
        }),
      );

      // act
      const result = await service.departmentNeedsSupport();

      // assert
      expect(result).toBe(expectedResult);
    },
  );
});
