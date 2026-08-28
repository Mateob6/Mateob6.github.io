import { Card, Badge } from "@/components/ui";
import { T } from "./t";

interface GroupCardProps {
  name: string;
  institution: string;
  periodEn: string;
  periodEs: string;
  rank: string;
}

export function GroupCard({ name, institution, periodEn, periodEs, rank }: GroupCardProps) {
  return (
    <Card className="flex items-start justify-between card-lift">
      <div>
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted">
          {institution} · <T en={periodEn} es={periodEs} />
        </p>
      </div>
      <Badge tone="success" className="shrink-0 text-[10px] font-bold uppercase tracking-widest">
        {rank}
      </Badge>
    </Card>
  );
}
