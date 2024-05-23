import { LucideIcon, Globe, UserRoundCheck, Users } from "lucide-react";
import { title, subtitle } from "@/components/Primitives";

export function Statistic({ icon: Icon, stat, label }: { icon: LucideIcon; stat: string; label: string }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Icon size={32} className="text-zinc-500" />
      <h1 className="text-2xl font-bold sm:text-3xl text-center">{stat}</h1>
      <p className="text text-zinc-400 text-center">{label}</p>
    </div>
  );
}

export async function LandingStatistics() {
  return (
    <section className="text-center">
      <div className="mb-16">
        <h1 className={title({ size: "md", bold: "bold" })}>Used by Hundreds.</h1>
      </div>
      {/* TODO: make the landing statistics dynamic from vercel analytics */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-16">
        <Statistic icon={Users} stat="3.2K+" label={"Page Views"} />
        <Statistic icon={UserRoundCheck} stat="500+" label={"Visitors"} />
        <Statistic icon={Globe} stat="60+" label={"Countries"} />
      </div>
    </section>
  );
}