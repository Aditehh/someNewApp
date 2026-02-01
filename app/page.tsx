import AuthButton from "@/components/ui/auth-button";
import { getCurrentUser } from "@/lib/domain";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    return <AuthButton />; // show login
  }

  console.log(user); // user + professionalProfile if you included it

  return (
    <>
      Welcome {user.name}, this is the best service app in Nepal
    </>
  );
}
