import { isAxiosError } from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import useLogin from "@/hooks/query/useLogin";
import { Loader2 } from "lucide-react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const loginSchema = z.object({
  username: z.string().min(4, { message: "Username length must be longer than 4" }),
  password: z.string().min(5, { message: "Password length must be longer than 4" }),
});

type FormValues = z.infer<typeof loginSchema>;

export default function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();
  const { mutateAsync: loginMutate } = useLogin();

  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    shouldFocusError: true,
    defaultValues: { username: "", password: "" },
  });
  const {
    formState: { errors, isSubmitting },
    setError,
    handleSubmit,
    control,
  } = form;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { username, password } = data;

    try {
      await loginMutate({ username, password });
      navigate("/dashboard");
    } catch (err) {
      if (isAxiosError<{ error: string }>(err)) {
        console.error("Axios error caught on login", err);

        if (err.response) {
          const { error } = err.response.data;

          if (error.includes("not found")) {
            setError("username", { type: "notFound", message: "User not found" });
          } else if (error.includes("incorrect")) {
            setError("password", { type: "incorrect", message: "Password is incorrect" });
          }
          return;
        }

        setError("root.server", {
          type: "unexpected",
          message: "An unexpected axios error has occured",
        });
      } else {
        console.error("Error caught on login", err);
        setError("root.server", {
          type: "unexpected",
          message: "An unexpected error has occured",
        });
      }
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="**********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errors.root && errors.root.server.type === "unexpected" && (
            <p className={"text-sm font-medium text-destructive"}>{errors.root.server.message}</p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Log In
          </Button>
        </form>
      </Form>
    </div>
  );
}
