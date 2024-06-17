import { Operation } from '@/entity/Operation';
import { OperationsRepository } from '@/repos/OperationRepo';

export class OperationService {
  constructor(private operationRepository: OperationsRepository) {}

  async findAllOperations() {
    return await this.operationRepository.findAll();
  }

  async findOperationById(id: number) {
    return await this.operationRepository.findById(id);
  }

  async createOperation(operation: Omit<Operation, 'id'>) {
    return await this.operationRepository.save(operation);
  }

  async updateOperation(operation: Operation) {
    await this.operationRepository.update({ id: operation.id }, operation);

    return await this.operationRepository.findById(operation.id);
  }

  async deleteOperation(id: number) {
    return await this.operationRepository.delete({ id });
  }

  async acknowledgeOperation(id: number) {
    const operation = await this.operationRepository.findById(id);
    if (operation?.isAcknowledged) {
      throw new Error('This operation is already acknowledged');
    }

    await this.operationRepository.acknowledgeOperation(id);
  }

  /**
   * Checks if the department needs support based on the ratio of acknowledged operations.
   * If we have too many operations that are not acknowledged we might need more people!
   *
   * @returns true if less than half of the operations are acknowledged
   */
  async departmentNeedsSupport() {
    const allOperations = await this.operationRepository.findAll();

    const acknowledgedOperations = allOperations?.filter(
      (op) => op.isAcknowledged === true,
    )?.length;
    const acknowledgedOperationsRatio =
      acknowledgedOperations / allOperations.length;

    return acknowledgedOperationsRatio <= 0.5;
  }
}
