import { type ChangeEvent, useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
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
import useUpdateUserProfile from "@/hooks/query/useUpdateUserProfile";
import { useToast } from "@/components/ui/use-toast";
import { isAxiosError } from "axios";
import type { User } from "@/types/user";
import { apiAsset } from "@/lib/utils";

const profileSchema = z.object({
  username: z.string().min(4, { message: "Username length must be longer than 4" }),
  name: z.string().min(1, { message: "Name length must be longer than 1" }),
  phone: z.string().min(1, { message: "Phone length must be longer than 1" }),
  address: z.string().min(1, { message: "Address length must be longer than 1" }),
  password: z.union([
    z.string().min(5, { message: "Password length must be longer than 5" }),
    z.literal(""),
  ]),
  newPassword: z.union([
    z.string().min(5, { message: "Password length must be longer than 5" }),
    z.literal(""),
  ]),
  image: z.custom<File>(),
});

type ProfileValues = z.infer<typeof profileSchema>;

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

export default function ProfileUpdateForm({ userData }: { userData: User }) {
  const [preview, setPreview] = useState("");

  const { mutateAsync: profileMutate } = useUpdateUserProfile();
  const { toast } = useToast();

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: userData.username,
      password: "",
      newPassword: "",
      name: userData.staff.name,
      phone: userData.staff.phone,
      address: userData.staff.address,
      image: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
    reset,
    setError,
  } = form;

  const onSubmit: SubmitHandler<ProfileValues> = async (data) => {
    const { username, password, newPassword, ...staffPayload } = data;
    const userPayload = { username, password, newPassword };

    try {
      const { user, staff } = await profileMutate({
        id: userData.staffId,
        userPayload,
        staffPayload,
      });

      reset({
        username: user.username,
        password: "",
        newPassword: "",
        name: staff.name,
        phone: staff.phone,
        address: staff.address,
        image: undefined,
      });

      toast({
        title: "Successfully updated profile",
        description: "Your profile has been successfully processed.",
      });
    } catch (err) {
      console.error("Caught: ", err);
      if (isAxiosError<{ error: string }>(err)) {
        if (err.response && err.response.status >= 400) {
          const { error: errorMsg } = err.response.data;
          if (errorMsg.includes("incorrect")) {
            setError("password", {
              type: "custom",
              message: "The password you entered is incorrect.",
            });
            return;
          }
        }
        toast({
          title: "Failed updating profile",
          description: "There was a problem with your request.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed updating profile",
          description: "An unexpected error has occured.",
          variant: "destructive",
        });
      }
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-stretch lg:flex-row lg:items-start gap-4"
        encType="multipart/form-data"
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
                src={preview || apiAsset(`images/staff/${userData.staff.image}`)}
                alt={userData.username}
                className="object-cover"
              />
              <AvatarFallback>
                {userData.username
                  .toUpperCase()
                  .split(" ")
                  .map((v) => v[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <FormField
              control={control}
              name="image"
              // Disable eslint error because file input cannot be controlled with value
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { onChange, value, ...rest } }) => (
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
                          onChange(files[0]);
                        }}
                      />
                    </FormControl>
                    <FormDescription>Choose your best image.</FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
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
                    <FormDescription>This is your current active phone number.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                    <FormDescription>This is your current home address.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col xl:flex-row gap-4 w-full">
                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex-1">
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
                    <FormItem className="flex-1">
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="New Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
  );
}
