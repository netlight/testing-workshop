import {
  randAvatar,
  randBoolean,
  randFullName,
  randImg,
  randNumber,
  randStreetAddress,
  randText,
  randTextRange,
} from "@ngneat/falso";

import { Operation } from "./Operation";

export function mockOperation<T extends Partial<Operation>>(
  overrides?: T
): Operation & T {
  const isAcknowledged = randBoolean();
  const assignee = isAcknowledged ? randFullName() : undefined;
  const assigneeAvatar = isAcknowledged
    ? `${randAvatar()}?${Math.random()}}`
    : undefined;
  const baseMock: Operation = {
    id: randNumber(),
    address: randStreetAddress(),
    description: randText(),
    longDescription: randTextRange({ min: 200, max: 1000 }),
    isAcknowledged,
    assignee,
    assigneeAvatar,
  };

  return { ...baseMock, ...overrides } as Operation & T;
}
