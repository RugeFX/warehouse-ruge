import ThemeToggler from "@/components/theme/ThemeToggler";
import TodosContainer from "./components/TodosContainer";
import { Button } from "@/components/ui/button";
import useTodos from "@/hooks/query/useTodos";

export default function TodosPage() {
  const { data, refetch, isLoading, error } = useTodos({ enabled: false });

  const onClick = () => {
    refetch();
  };

  return (
    <main className="w-full p-5 min-h-screen h-full bg-gradient-to-br from-gray-100 to-emerald-200 dark:from-gray-900 dark:to-emerald-950">
      <ThemeToggler />
      <div className="flex flex-col gap-3 items-center mb-5">
        <h1 className="text-center text-3xl font-bold text-foreground">Todos API</h1>
        <Button className="bg-primary" onClick={onClick}>
          Fetch Todos
        </Button>
        <TodosContainer todos={data?.todos} isLoading={isLoading} error={error} />
      </div>
    </main>
  );
}
