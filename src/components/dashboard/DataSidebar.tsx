import { indicators, Indicator, pillars } from "@/data/indicators";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DataSidebarProps {
  isOpen: boolean;
}

export function DataSidebar({ isOpen }: DataSidebarProps) {
  const [isLocked, setIsLocked] = useState(false);
  const [rank2023, setRank2023] = useState(41);
  const [rank2025, setRank2025] = useState(43);

  // Group indicators by subpillar
  const groupedIndicators: Record<string, Indicator[]> = {};
  indicators.forEach((ind) => {
    if (!groupedIndicators[ind.subpillar]) {
      groupedIndicators[ind.subpillar] = [];
    }
    groupedIndicators[ind.subpillar].push(ind);
  });

  return (
    <aside
      className={cn(
        "w-[380px] bg-card border-r border-border flex flex-col h-[calc(100vh-121px)] sidebar-transition flex-shrink-0",
        !isOpen && "-ml-[380px]"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">Data Input</h2>
          <Button
            variant={isLocked ? "default" : "outline"}
            size="sm"
            onClick={() => setIsLocked(!isLocked)}
            className="gap-1.5"
          >
            {isLocked ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
            {isLocked ? "Locked" : "Unlock"}
          </Button>
        </div>

        {/* Global Rank Inputs */}
        <div className="flex gap-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md">
          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Rank '23</label>
            <input
              type="number"
              value={rank2023}
              onChange={(e) => setRank2023(Number(e.target.value))}
              disabled={isLocked}
              className="w-16 px-2 py-1.5 border border-blue-200 rounded text-sm disabled:opacity-50 disabled:bg-muted"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Rank '25</label>
            <input
              type="number"
              value={rank2025}
              onChange={(e) => setRank2025(Number(e.target.value))}
              disabled={isLocked}
              className="w-16 px-2 py-1.5 border border-blue-200 rounded text-sm disabled:opacity-50 disabled:bg-muted"
            />
          </div>
        </div>
      </div>

      {/* Scrollable Input Area */}
      <ScrollArea className="flex-1 px-4 py-3">
        {Object.entries(groupedIndicators).map(([subpillar, inds]) => (
          <div key={subpillar} className="mb-4">
            <div className="bg-blue-50 dark:bg-blue-950/30 px-3 py-2 rounded-md mb-2 sticky top-0">
              <span className="text-xs text-muted-foreground">{inds[0].pillar}</span>
              <h4 className="text-sm font-semibold text-primary">{subpillar.substring(4)}</h4>
            </div>

            <div className="space-y-2">
              {inds.map((ind) => (
                <div
                  key={ind.id}
                  className="p-3 border border-border rounded-md bg-background hover:border-accent transition-colors"
                >
                  <label className="block text-xs font-medium text-foreground mb-2">
                    {ind.code} - {ind.name}
                    {ind.indicatorStatus === "new" && (
                      <span className="ml-1.5 badge-new text-[9px] px-1 py-0.5 rounded uppercase">New</span>
                    )}
                    {ind.indicatorStatus === "replaced" && (
                      <span className="ml-1.5 badge-replaced text-[9px] px-1 py-0.5 rounded uppercase">Replaced</span>
                    )}
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <span className="text-[10px] text-muted-foreground block mb-0.5">2023</span>
                      <input
                        type="number"
                        value={ind.score2023 ?? ""}
                        readOnly
                        disabled={isLocked}
                        className="w-full px-2 py-1 border border-border rounded text-xs score-mono disabled:opacity-50 disabled:bg-muted"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] text-muted-foreground block mb-0.5">2025</span>
                      <input
                        type="number"
                        value={ind.score2025 ?? ""}
                        readOnly
                        disabled={isLocked}
                        className="w-full px-2 py-1 border border-border rounded text-xs score-mono disabled:opacity-50 disabled:bg-muted"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
    </aside>
  );
}
