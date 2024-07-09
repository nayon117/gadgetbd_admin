// HomePage.tsx
import PassKeyModal from "@/components/custom ui/PassKeyModal";
import { Button } from "@/components/ui/button";
import { SearchParamProps } from "@/types";
import Link from "next/link";

const HomePage = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="mb-8 text-4xl">Welcome to GadgetBD 👋</h1>
      {!isAdmin && (
        <Link href="/?admin=true" passHref>
          <Button className=" btn primary-gradient mb-4 text-white">
            {" "}
            Enter the Admin Dashboard
          </Button>
        </Link>
      )}
      {isAdmin && <PassKeyModal />}
    </div>
  );
};

export default HomePage;
