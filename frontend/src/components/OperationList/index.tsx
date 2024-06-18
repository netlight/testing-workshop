import { useCallback, useEffect, useState } from "react";
import {
  acknowledgeOperation,
  getOperations,
} from "@/services/OperationService";
import { Operation as OperationModel } from "@/models/Operation";
import { Operation } from "../Operation";

export function OperationList() {
  const [operations, setOperations] = useState<OperationModel[]>([]);
  const [status, setStatus] = useState<"pending" | "success">("pending");

  const handleAcknowledge = useCallback(async (operation: OperationModel) => {
    const updatedOperation = await acknowledgeOperation(operation);

    setOperations((operations) => {
      const operationIndex = operations.findIndex(
        (operation) => operation.id === updatedOperation.id
      );
      return [
        ...operations.slice(0, operationIndex),
        updatedOperation,
        ...operations.slice(operationIndex + 1),
      ];
    });
  }, []);

  useEffect(() => {
    getOperations().then((result) => {
      setOperations(result);
      setStatus("success");
    });
  }, []);

  if (status === "pending") {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col gap-4">
      {operations.map((operation) => (
        <Operation
          key={operation.id}
          operation={operation}
          onAcknowledge={() => handleAcknowledge(operation)}
        />
      ))}
    </div>
  );
}
