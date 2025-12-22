import { useState } from "react";
import { pillarDataStructure, indicators, PillarData } from "@/data/indicators";
import { cn } from "@/lib/utils";
import { Info, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Mini sparkline component
function Sparkline({
  values,
  color
}: {
  values: number[];
  color: string;
}) {
  if (values.length < 2) return null;
  
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const height = 32;
  const width = 60;
  const padding = 4;
  
  const points = values.map((v, i) => {
    const x = padding + (i / (values.length - 1)) * (width - padding * 2);
    const y = padding + (height - padding * 2) - ((v - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });
  
  const pathD = points.map((p, i) => (i === 0 ? `M ${p}` : `L ${p}`)).join(" ");
  const trend = values[values.length - 1] - values[0];
  const strokeColor = trend > 0 ? "hsl(var(--success))" : trend < 0 ? "hsl(var(--danger))" : color;
  
  return (
    <svg width={width} height={height} className="overflow-visible">
      {/* Trend line */}
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Start point (2023) */}
      <circle
        cx={points[0].split(",")[0]}
        cy={points[0].split(",")[1]}
        r={3}
        fill="hsl(var(--muted-foreground))"
      />
      {/* End point (2025) */}
      <circle
        cx={points[points.length - 1].split(",")[0]}
        cy={points[points.length - 1].split(",")[1]}
        r={3}
        fill={strokeColor}
      />
    </svg>
  );
}

// Score pulse indicator
function ScorePulse({
  score2023,
  score2025,
  rank2023,
  rank2025
}: {
  score2023: number;
  score2025: number;
  rank2023: number;
  rank2025: number;
}) {
  const scoreDiff = score2025 - score2023;
  const rankDiff = rank2023 - rank2025; // Positive = improved rank

  return <div className="flex items-center gap-6">
      <div className="text-center">
        <div className="text-3xl font-bold score-mono text-foreground">{score2025.toFixed(1)}</div>
        <div className="text-xs text-muted-foreground mt-1">Score 2025</div>
        <div className={cn("text-xs font-medium mt-1 flex items-center justify-center gap-0.5", scoreDiff > 0 ? "text-success" : scoreDiff < 0 ? "text-danger" : "text-muted-foreground")}>
          {scoreDiff > 0 ? <TrendingUp className="h-3 w-3" /> : scoreDiff < 0 ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
          {scoreDiff > 0 ? "+" : ""}{scoreDiff.toFixed(2)}
        </div>
      </div>

      <div className="h-12 w-px bg-border" />

      <div className="text-center">
        <div className="text-2xl font-bold text-foreground">#{rank2025}</div>
        <div className="text-xs text-muted-foreground mt-1">Rank 2025</div>
        <div className={cn("text-xs font-medium mt-1 flex items-center justify-center gap-0.5", rankDiff > 0 ? "text-success" : rankDiff < 0 ? "text-danger" : "text-muted-foreground")}>
          {rankDiff > 0 ? "▲" : rankDiff < 0 ? "▼" : "–"} {Math.abs(rankDiff)}
        </div>
      </div>
    </div>;
}

// Get pillar-specific colors
function getPillarColor(pillarName: string): {
  bg: string;
  accent: string;
  hex: string;
} {
  const colors: Record<string, {
    bg: string;
    accent: string;
    hex: string;
  }> = {
    "Enable": {
      bg: "bg-rose-50 dark:bg-rose-950/30",
      accent: "border-rose-300 dark:border-rose-700",
      hex: "#e11d48"
    },
    "Attract": {
      bg: "bg-purple-50 dark:bg-purple-950/30",
      accent: "border-purple-300 dark:border-purple-700",
      hex: "#9333ea"
    },
    "Grow": {
      bg: "bg-violet-50 dark:bg-violet-950/30",
      accent: "border-violet-300 dark:border-violet-700",
      hex: "#7c3aed"
    },
    "Retain": {
      bg: "bg-sky-50 dark:bg-sky-950/30",
      accent: "border-sky-300 dark:border-sky-700",
      hex: "#0ea5e9"
    },
    "Vocational & Technical Skills": {
      bg: "bg-teal-50 dark:bg-teal-950/30",
      accent: "border-teal-300 dark:border-teal-700",
      hex: "#14b8a6"
    },
    "Global Knowledge Skills": {
      bg: "bg-amber-50 dark:bg-amber-950/30",
      accent: "border-amber-300 dark:border-amber-700",
      hex: "#f59e0b"
    }
  };
  return colors[pillarName] || {
    bg: "bg-muted",
    accent: "border-border",
    hex: "#6b7280"
  };
}

// Get data owners for a pillar
function getPillarDataOwners(pillarName: string): string[] {
  const pillarIndicators = indicators.filter(i => i.pillar === pillarName && i.dataOwner);
  const owners = [...new Set(pillarIndicators.map(i => i.dataOwner))];
  return owners.slice(0, 5);
}

// Pillar Bento Card Component
function PillarBentoCard({
  pillar
}: {
  pillar: PillarData;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = getPillarColor(pillar.name);
  const dataOwners = getPillarDataOwners(pillar.name);

  // Trend data for 2023 and 2025
  const trendData = [pillar.score2023, pillar.score2025];
  const pillarIndicators = indicators.filter(i => i.pillar === pillar.name && i.indicatorStatus !== "replaced");
  return <div className={cn("rounded-xl border-2 p-5 transition-all duration-300 hover:shadow-lg", colors.bg, colors.accent)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Pillar {pillar.id}
          </div>
          <h3 className="text-lg font-bold text-foreground">{pillar.name}</h3>
        </div>

        {/* Attribution Layer */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 rounded-full hover:bg-background/50 transition-colors">
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs p-3">
              <div className="text-sm font-semibold mb-2">Data Owners</div>
              <ul className="text-xs space-y-1">
                {dataOwners.map((owner, i) => <li key={i} className="text-muted-foreground">• {owner}</li>)}
              </ul>
              {dataOwners.length < getPillarDataOwners(pillar.name).length && <div className="text-xs text-muted-foreground mt-1">
                  +{getPillarDataOwners(pillar.name).length - dataOwners.length} more
                </div>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* The Pulse - Score & Rank */}
      <div className="flex items-center justify-between mb-4">
        <ScorePulse score2023={pillar.score2023} score2025={pillar.score2025} rank2023={pillar.rank2023} rank2025={pillar.rank2025} />

        {/* Intelligence Layer - Sparkline with labels */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground">2023</span>
            <Sparkline values={trendData} color={colors.hex} />
            <span className="text-[10px] text-muted-foreground">2025</span>
          </div>
          <span className="text-[10px] text-muted-foreground">Score Trend</span>
        </div>
      </div>

      {/* Sub-pillars Section */}
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer">
            <span className="text-sm font-medium">
              {pillar.subpillars.length} Sub-pillars • {pillarIndicators.length} Indicators
            </span>
            {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-3 space-y-3 animate-fade-in">
          {pillar.subpillars.map(subpillar => {
          const subIndicators = pillarIndicators.filter(i => i.subpillar.startsWith(subpillar.id));
          const subScoreDiff = subpillar.score2025 - subpillar.score2023;
          return <div key={subpillar.id} className="p-3 rounded-lg bg-background/70 border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs text-muted-foreground">{subpillar.id}</span>
                    <h4 className="text-sm font-semibold">{subpillar.name}</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold score-mono">{subpillar.score2025.toFixed(1)}</div>
                    <div className={cn("text-xs font-medium", subScoreDiff > 0 ? "text-success" : subScoreDiff < 0 ? "text-danger" : "text-muted-foreground")}>
                      {subScoreDiff > 0 ? "+" : ""}{subScoreDiff.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* All Indicators */}
                <div className="space-y-1.5 mt-3 max-h-[300px] overflow-y-auto pr-1">
                  {subIndicators.map(ind => {
                const indDiff = ind.score2025 !== null && ind.score2023 !== null ? ind.score2025 - ind.score2023 : null;
                return <div key={ind.id} className="flex items-center justify-between text-xs py-1 border-b border-border/30 last:border-0">
                        <span className="text-muted-foreground truncate max-w-[55%]" title={`${ind.code} ${ind.name}`}>
                          <span className="font-medium text-foreground">{ind.code}</span> {ind.name}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="score-mono text-muted-foreground text-[10px]">
                            {ind.score2023 !== null ? ind.score2023.toFixed(1) : "n/a"}
                          </span>
                          <span className="text-muted-foreground">→</span>
                          <span className="score-mono font-medium">
                            {ind.score2025 !== null ? ind.score2025.toFixed(1) : "n/a"}
                          </span>
                          {indDiff !== null && <span className={cn("text-[10px] min-w-[32px] text-right", indDiff > 0 ? "text-success" : indDiff < 0 ? "text-danger" : "text-muted-foreground")}>
                              {indDiff > 0 ? "+" : ""}{indDiff.toFixed(1)}
                            </span>}
                        </div>
                      </div>;
              })}
                </div>
              </div>;
        })}
        </CollapsibleContent>
      </Collapsible>
    </div>;
}
export function PillarsBento() {
  return <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">GTCI Pillars Overview</h1>
        <p className="text-muted-foreground">
          Explore all 6 pillars, their sub-pillars, and key indicators in an interactive bento layout.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {pillarDataStructure.map(pillar => <PillarBentoCard key={pillar.id} pillar={pillar} />)}
      </div>

      {/* Legend */}
      <div className="mt-8 p-4 bg-card rounded-lg border border-border">
        <h3 className="font-semibold mb-3">Legend</h3>
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-muted-foreground">Improved (↑)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-danger" />
            <span className="text-muted-foreground">Declined (↓)</span>
          </div>
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Hover for data owner info</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">2023</span>
            <Sparkline values={[45, 50]} color="#22c55e" />
            <span className="text-xs text-muted-foreground">2025</span>
            <span className="text-muted-foreground ml-1">Score trend (2023 → 2025)</span>
          </div>
        </div>
      </div>
    </div>;
}