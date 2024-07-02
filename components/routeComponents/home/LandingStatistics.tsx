import { LucideIcon, Globe, UserRoundCheck, Users, BookOpenText } from "lucide-react";
import { title, subtitle } from "@/components/misc/Primitives";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Statistic({ icon: Icon, stat, label }: { icon: LucideIcon; stat: string; label: string }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Icon size={32} className="" />
      <h3 className={title({ size: "sm", bold: "bold", color: "blue" })}>{stat}</h3>
      <p className="text-muted-foreground text-center">{label}</p>
    </div>
  );
}

export async function LandingStatistics() {
  return (
    <section className="text-center">
      <div className="mb-16">
        <h2 className={title({ size: "md", bold: "bold" })}>
          Used by <span className={title({ size: "md", bold: "extra", color: "yellow" })}> Hundreds. </span>
        </h2>
        <p className={subtitle({size: "sm", fullWidth: true})}>We empower hackers around the world.</p>
      </div>
      {/* Last update: 6/23/24 */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-16">
        <Statistic icon={Users} stat="4.6K+" label={"Total Views"} />
        <Statistic icon={UserRoundCheck} stat="950+" label={"Users"} />
        <Statistic icon={Globe} stat="75" label={"Countries"} />
        <Statistic icon={BookOpenText} stat="10+" label={"Guides"} />
      </div>
      <Button variant="default" size="xl" asChild>
          <Link href="/explore">Explore Guides</Link>
      </Button>
    </section>
  );
}