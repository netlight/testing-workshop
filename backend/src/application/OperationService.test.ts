import { describe, expect, it, vi } from 'vitest';

import { mockOperation } from '@/entity/Operation.mock';
import { OperationsRepository } from '@/repos/OperationRepo';

import { OperationService } from './OperationService';

describe('OperationService', () => {
  it('should find all operations', async () => {
    // arrange
    const operation = mockOperation();
    const findAll = vi.fn().mockResolvedValue([operation]);
    const mockRepository = {
      findAll,
    } as unknown as OperationsRepository;
    const service = new OperationService(mockRepository);

    // act
    const result = await service.findAllOperations();

    // assert
    expect(result).toEqual([operation]);
    expect(findAll).toHaveBeenCalled();
  });

  it.todo('should find one operation');

  it.todo('should create a new operation');

  it.todo('should update a new operation');

  it.todo('should delete an operation');

  it('should acknowledge an operation', async () => {
    // arrange
    const operation = mockOperation({ isAcknowledged: false });
    const findById = vi.fn().mockResolvedValue(operation);
    const acknowledgeOperation = vi.fn();
    const mockRepository = {
      findById,
      acknowledgeOperation,
    } as unknown as OperationsRepository;
    const service = new OperationService(mockRepository);

    // act
    await service.acknowledgeOperation(operation.id);

    // assert
    expect(findById).toHaveBeenCalledWith(operation.id);
    expect(acknowledgeOperation).toHaveBeenCalledWith(operation.id);
  });

  it('should throw an error if an operation is already acknowledged', async () => {
    // arrange
    const operation = mockOperation({ isAcknowledged: true });
    const findById = vi.fn().mockResolvedValue(operation);
    const acknowledgeOperation = vi.fn();
    const mockRepository = {
      findById,
      acknowledgeOperation,
    } as unknown as OperationsRepository;
    const service = new OperationService(mockRepository);

    // act
    expect(
      async () => await service.acknowledgeOperation(operation.id),
    ).rejects.toThrow();

    // assert
    expect(findById).toHaveBeenCalledWith(operation.id);
    expect(acknowledgeOperation).not.toHaveBeenCalled();
  });

  const needsSupportCases: Array<[number, number, boolean]> = [
    // not acknowledged operations count, acknowledged operations count, expected result
    [0, 0, false],
    [0, 30, false],
    [14, 30, false],
    [15, 30, true],
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
      const mockRepository = {
        findAll,
      } as unknown as OperationsRepository;
      const service = new OperationService(mockRepository);

      // act
      const result = await service.departmentNeedsSupport();

      // assert
      expect(result).toBe(expectedResult);
    },
  );
});
