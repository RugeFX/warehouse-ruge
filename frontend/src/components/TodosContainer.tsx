import type { Todo } from "@/hooks/query/useTodos";
import type { AxiosError } from "axios";
import { CircleDashed } from "lucide-react";

export default function TodosContainer({
  todos,
  isLoading,
  error,
}: {
  todos?: Todo[];
  isLoading: boolean;
  error: AxiosError | null;
}) {
  if (isLoading) {
    return (
      <span className="mx-auto text-center">
        Loading...
        <CircleDashed className="inline animate-spin" />
      </span>
    );
  }

  if (todos) {
    return (
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <li key={todo.id} className="bg-card px-5 py-2 border-2 border-muted rounded-md">
            {todo.id}. {todo.todo}
          </li>
        ))}
      </ul>
    );
  }

  if (!isLoading && error) {
    return <span className="text-center mx-auto">Something went wrong....</span>;
  }
}
