import { describe, it } from 'vitest';

describe('OperationService', () => {
  it('should find all operations', async () => {
    // arrange
    // TODO: Mock a repository
    // TODO: Setup the service
    // act
    // TODO: Call the findAllOperations method
    // assert
    // TODO: Assert that the results are what we expect
  });

  it.todo('should find one operation');

  it.todo('should create a new operation');

  it.todo('should update a new operation');

  it.todo('should delete an operation');

  it.todo('should acknowledge an operation');

  it.todo('should throw an error if an operation is already acknowledged');

  const needsSupportCases: Array<[number, number, boolean]> = [
    // not acknowledged operations count, acknowledged operations count, expected result
    [30, 30, true],
  ];

  it.each(needsSupportCases)(
    'when %s out of %s operations are not acknowledged, departmentNeedsSupport should return %s',
    async (
      notAcknowledgedOperationsCount,
      totalOperationsCount,
      expectedResult,
    ) => {
      console.log({
        notAcknowledgedOperationsCount,
        totalOperationsCount,
        expectedResult,
      });
      console.log('todo');
    },
  );
});
