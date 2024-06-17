import { OperationList } from "./components/OperationList";

export function App() {
  return (
    <div className="flex flex-column justify-center">
      <main className="max-w-screen-sm p-4 w-full flex flex-col gap-8">
        <h1 className="text-3xl">All current operations</h1>
        <OperationList />
      </main>
    </div>
  );
}
