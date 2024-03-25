import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Welcome to Hackpost</h1>
      <p className="text-xl">
        A guide to hacking the planet
      </p>
      {/* <Image
        src="/images/hackpost.png"
        alt="Hackpost logo"
        width={500}
        height={500}
      /> */}
    </main>
  );
}
