import { type ChangeEvent, useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useUserData } from "@/store";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/api/apiClient";
import { ProfileUpdateResponse } from "@/types/response";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";

const profileSchema = z.object({
  username: z.string().min(4, { message: "Username length must be longer than 4" }),
  name: z.string().min(1, { message: "Name length must be longer than 1" }),
  phone: z.string().min(1, { message: "Phone length must be longer than 1" }),
  password: z.string().min(5, { message: "Password length must be longer than 5" }),
  newPassword: z.string().min(5, { message: "Password length must be longer than 5" }),
  image: z.custom<FileList>(),
});

type ProfileValues = z.infer<typeof profileSchema>;

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

export default function ProfilePage() {
  const [preview, setPreview] = useState("");

  const userData = useUserData();
  const { mutateAsync: profileMutate } = useMutation<
    ProfileUpdateResponse,
    AxiosError,
    { id: number; payload: FormData }
  >({
    mutationFn: async ({ id, payload }) => {
      const res = await apiClient.put<ProfileUpdateResponse>(`staff/${id}`, payload);
      return res.data;
    },
  });

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: userData?.username,
      password: "",
      newPassword: "",
      name: userData?.staff.name,
      phone: userData?.staff.phone,
      image: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
  } = form;

  const onSubmit: SubmitHandler<ProfileValues> = async (data) => {
    const payload = new FormData();

    payload.append("name", data.name);
    payload.append("phone", data.phone);
    if (data.image) {
      payload.append("image", data.image[0]);
    }

    try {
      await profileMutate({ id: userData!.staffId, payload });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-stretch lg:flex-row lg:items-start gap-4"
        >
          <Card className="w-full lg:w-72">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Profile image</CardTitle>
              <CardDescription>Update your profile image</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 items-center">
              <Separator />
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={preview ?? userData?.staff.image}
                  alt={userData?.username}
                  className="object-cover"
                />
                <AvatarFallback>
                  {userData?.username
                    .toUpperCase()
                    .split(" ")
                    .map((v) => v[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <FormField
                control={control}
                name="image"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { onChange, value, ...rest } }) => {
                  console.log("value", value);
                  return (
                    <>
                      <FormItem>
                        <FormLabel>Upload image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            {...rest}
                            onChange={(event) => {
                              const { files, displayUrl } = getImageData(event);
                              setPreview(displayUrl);
                              onChange(files);
                            }}
                          />
                        </FormControl>
                        <FormDescription>Choose your best image.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    </>
                  );
                }}
              />
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Profile details</CardTitle>
              <CardDescription>Update details for your account</CardDescription>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
              <div className="grid gap-2">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormDescription>This is your real full name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormDescription>This is your public display name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone" {...field} />
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
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Old Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="New Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button disabled={isSubmitting || !isDirty} type="submit">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
}
