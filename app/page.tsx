import { Button } from "@nextui-org/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-between px-6">
      <h1 className="text-6xl font-bold">Welcome to Hackpost</h1>
      <p className="text-xl">
        A guide to hacking the planet
      </p>
      <Button color="primary">
        Button
      </Button>
      {/* <Image
        src="/images/hackpost.png"
        alt="Hackpost logo"
        width={500}
        height={500}
      /> */}
    </main>
  );
}
