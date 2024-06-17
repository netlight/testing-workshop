import { Operation } from "@/models/Operation";
import { mockOperation } from "@/models/Operation.mock";
import { randAvatar, randFullName } from "@ngneat/falso";

export async function acknowledgeOperation(
  operation: Operation
): Promise<Operation> {
  try {
    await fetch("https://www.example.com/api/acknowledge", {
      method: "POST",
      body: JSON.stringify({ id: operation.id }),
    });
  } catch (error) {
    // just swallow the error
  }

  return {
    ...operation,
    isAcknowledged: true,
    assignee: randFullName(),
    assigneeAvatar: randAvatar(),
  };
}

export function getOperations() {
  return Array.from({ length: 20 }).map(() => mockOperation());
}
