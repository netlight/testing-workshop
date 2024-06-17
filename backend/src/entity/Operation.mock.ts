import {
  randBoolean,
  randNumber,
  randStreetAddress,
  randText,
} from '@ngneat/falso';

import { Operation } from './Operation';

export function mockOperation<T extends Partial<Operation>>(
  overrides?: T,
): Operation & T {
  const baseMock: Operation = {
    id: randNumber(),
    address: randStreetAddress(),
    description: randText(),
    isAcknowledged: randBoolean(),
  };

  return { ...baseMock, ...overrides } as Operation & T;
}
