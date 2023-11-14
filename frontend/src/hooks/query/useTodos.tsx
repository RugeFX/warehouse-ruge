import { useQuery, type UndefinedInitialDataOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export type Todo = {
  id: string;
  todo: string;
  completed: boolean;
  userId: number;
};

type TodosResponse = {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
};

const TODOS_URL = "https://dummyjson.com/todos";

const getTodos = async () => {
  const res = await axios.get<TodosResponse>(TODOS_URL);
  return res.data;
};

export default function useTodos(
  options?: Partial<UndefinedInitialDataOptions<TodosResponse, AxiosError>>
) {
  return useQuery<TodosResponse, AxiosError>({
    queryKey: ["todos"],
    queryFn: getTodos,
    ...options,
  });
}
