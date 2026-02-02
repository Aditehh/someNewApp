import AuthButton from "@/components/ui/auth-button";
import BecomeProviderForm from "@/components/ui/become-provider-form";
import HeroSection from "@/components/ui/hero-section";
import Navbar from "@/components/ui/navbar";
import { getCurrentUser } from "@/lib/domain";
import { Button } from "@base-ui/react";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    return <AuthButton />; // show login
  }


  console.log(user); // user + professionalProfile if you included it

  return (
    <>
    <Navbar/>
      <HeroSection />
      {/* Welcome {user.name}, this is the best service app in Nepal
      {user.role !== "PROVIDER" && <div>
        <BecomeProviderForm />
      </div>
      }:{
        <div>
          Already a provider
        </div>
      } */}

      <section className="py-20 px-4 bg-indigo-50 text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Want to Offer Your Services?</h2>
        <p className="text-indigo-600 mb-8 max-w-lg mx-auto">
          Become a verified provider and get your business listed to thousands of users across Nepal.
        </p>
        {user.role !== "PROVIDER" && (
          <Button className="px-8 py-3 bg-amber-400 hover:bg-amber-500 rounded-lg font-medium">
            Become a Provider
          </Button>
        )}: {
          <Button className="px-8 py-3 bg-amber-400 hover:bg-amber-500 rounded-lg font-medium">
            List your service
          </Button>
        }
      </section>
    </>
  );
}
