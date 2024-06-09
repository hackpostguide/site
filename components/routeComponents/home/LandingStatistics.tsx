import { LucideIcon, Globe, UserRoundCheck, Users } from "lucide-react";
import { title, subtitle } from "@/components/Primitives";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Statistic({ icon: Icon, stat, label }: { icon: LucideIcon; stat: string; label: string }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Icon size={32} className="" />
      <h1 className={title({ size: "sm", bold: "bold", color: "blue" })}>{stat}</h1>
      <p className="text-muted-foreground text-center">{label}</p>
    </div>
  );
}

export async function LandingStatistics() {
  return (
    <section className="text-center">
      <div className="mb-16">
        <h1 className={title({ size: "md", bold: "bold" })}>Used by&nbsp;</h1>
        <h1 className={title({ size: "md", bold: "bold", color: "yellow" })}>Hundreds.</h1>
        <p className={subtitle({size: "sm", fullWidth: true})}>We empower hackers around the world.</p>
      </div>
      {/* TODO: make the landing statistics dynamic from vercel analytics */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-16">
        <Statistic icon={Users} stat="4.2K+" label={"Total Views"} />
        <Statistic icon={UserRoundCheck} stat="850+" label={"Users"} />
        <Statistic icon={Globe} stat="75" label={"Countries"} />
      </div>
      <Button variant="default" size="xl" asChild>
          <Link href="/explore">Start Exploring</Link>
      </Button>
    </section>
  );
}