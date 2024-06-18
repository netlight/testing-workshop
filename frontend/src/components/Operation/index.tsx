import { Operation as OperationModel } from "@/models/Operation";
import { useState } from "react";

export interface OperationProps {
  operation: OperationModel;
  onAcknowledge?: () => void;
}

export function Operation({ operation, onAcknowledge }: OperationProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="shadow-md rounded-md p-4 bg-slate-50 hover:shadow-lg hover:cursor-pointer flex flex-col gap-8"
      role="button"
      aria-label="toggle details"
      onClick={() => setOpen((current) => !current)}
    >
      <div className="grid grid-cols-[max-content_2px_1fr_2px_1fr]  gap-4 justify-between">
        <div className="rounded-full size-16 self-center justify-self-center">
          {operation.assigneeAvatar ? (
            <img
              src={operation.assigneeAvatar}
              alt={operation.assignee}
              className="aspect-square"
            />
          ) : (
            <div className="aspect-square bg-slate-300 w-full"></div>
          )}
        </div>
        <div className="w-[2px] bg-slate-300 h-full"></div>
        <div>
          <p className="font-bold">Operation #{operation.id}</p>
          <p>{operation.description}</p>
          <p>{operation.address}</p>
          <p>{operation.isAcknowledged}</p>
        </div>

        <div className="w-[2px] bg-slate-300 h-full"></div>
        {!operation.isAcknowledged && (
          <button
            onClick={(event) => {
              event.stopPropagation();
              onAcknowledge?.();
            }}
            className="p-3 bg-lime-500 rounded-sm hover:bg-lime-600"
          >
            Acknowledge
          </button>
        )}
        {operation.isAcknowledged && <p>Already acknowledged</p>}
      </div>
      {open && (
        <div>
          <p>{operation.longDescription}</p>
        </div>
      )}
    </div>
  );
}
