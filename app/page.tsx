import Image from "next/image";
import { getUserWithProfessionalProfile } from "@/lib/domain";

export default function Home() {

  const user = getUserWithProfessionalProfile;

  console.log(user)

  return (
    <>
      this the best service app rn in nepal yk
    </>
  );
}
