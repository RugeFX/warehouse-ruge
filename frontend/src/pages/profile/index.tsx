import { useUserData } from "@/store";
import ProfileUpdateForm from "./components/ProfileUpdateForm";

export default function ProfilePage() {
  const userData = useUserData()!;

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
      <ProfileUpdateForm userData={userData} />
    </main>
  );
}
