import { cn } from "@/lib/utils";

interface SummaryCardsProps {
  netChange: number;
  improved: number;
  declined: number;
  missing: number;
  onFilterChange: (filter: string) => void;
}

export function SummaryCards({ netChange, improved, declined, missing, onFilterChange }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div 
        className="bg-card rounded-lg p-6 shadow-card card-interactive"
        onClick={() => onFilterChange("all")}
      >
        <div className="text-sm text-muted-foreground mb-2">Net Score Change</div>
        <div className={cn(
          "text-3xl font-bold score-mono",
          netChange > 0 ? "text-success" : netChange < 0 ? "text-danger" : "text-muted-foreground"
        )}>
          {netChange > 0 ? "+" : ""}{netChange.toFixed(2)}
        </div>
        <div className={cn(
          "text-sm mt-2 font-medium",
          netChange > 0 ? "trend-up" : netChange < 0 ? "trend-down" : "trend-neutral"
        )}>
          {netChange > 0 ? "↑ Improved" : netChange < 0 ? "↓ Declined" : "→ Stable"}
        </div>
      </div>

      <div 
        className="bg-card rounded-lg p-6 shadow-card card-interactive"
        onClick={() => onFilterChange("improved")}
      >
        <div className="text-sm text-muted-foreground mb-2">Improved Indicators</div>
        <div className="text-3xl font-bold text-success score-mono">{improved}</div>
      </div>

      <div 
        className="bg-card rounded-lg p-6 shadow-card card-interactive"
        onClick={() => onFilterChange("declined")}
      >
        <div className="text-sm text-muted-foreground mb-2">Declined Indicators</div>
        <div className="text-3xl font-bold text-danger score-mono">{declined}</div>
      </div>

      <div 
        className="bg-card rounded-lg p-6 shadow-card card-interactive"
        onClick={() => onFilterChange("missing")}
      >
        <div className="text-sm text-muted-foreground mb-2">Missing Data (2025)</div>
        <div className="text-3xl font-bold text-warning score-mono">{missing}</div>
      </div>
    </div>
  );
}
