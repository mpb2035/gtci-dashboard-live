31
  import { useState, useMemo } from "react";
import { Indicator, pillars } from "@/data/indicators";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExternalLink } from "lucide-react";

interface IndicatorTableProps {
  indicators: Indicator[];
  statusFilter: string;
  onStatusFilterChange: (filter: string) => void;
}

export function IndicatorTable({ indicators, statusFilter, onStatusFilterChange }: IndicatorTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [pillarFilter, setPillarFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState<"all" | "2023" | "2025">("all");
  const [sortKey, setSortKey] = useState<string>("code");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filteredIndicators = useMemo(() => {
    let result = [...indicators];

    // Year filter - based on indicator status, NOT on score null/not-null
    if (yearFilter === "2023") {
    result = result.filter(i => i.indicatorStatus !== "new" && i.indicatorStatus !== "code-changed");      // 2025 universe: exclude "replaced" and "removed" indicators (they were superseded/removed)
      // This gives us 77 indicators including "new" and "code-changed" ones
      result = result.filter(i => i.indicatorStatus !== "replaced" && i.indicatorStatus !== "removed");
    }
    // "All" view: no status-based filtering - show all indicators from both years

    // Status filter
    if (statusFilter === "improved") {
      result = result.filter(i => 
        i.score2025 !== null && i.score2023 !== null && (i.score2025 - i.score2023) > 0
      );
    } else if (statusFilter === "declined") {
      result = result.filter(i => 
        i.score2025 !== null && i.score2023 !== null && (i.score2025 - i.score2023) < 0
      );
    } else if (statusFilter === "missing") {
      // Missing: only show indicators with null score2025 (n/a), NOT those with 0
      result = result.filter(i => 
        !i.is2023Only && i.indicatorStatus !== 'replaced' && i.indicatorStatus !== 'removed' && i.score2025 === null
      );
    }

    // Pillar filter
    if (pillarFilter !== "all") {
      result = result.filter(i => i.pillar === pillarFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(i => 
        i.code.toLowerCase().includes(query) || 
        i.name.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      let valA: string | number | null;
      let valB: string | number | null;

      if (sortKey === "diff") {
        valA = (a.score2025 || 0) - (a.score2023 || 0);
        valB = (b.score2025 || 0) - (b.score2023 || 0);
      } else if (sortKey === "score2023" || sortKey === "score2025") {
        valA = a[sortKey];
        valB = b[sortKey];
      } else {
        valA = a[sortKey as keyof Indicator] as string;
        valB = b[sortKey as keyof Indicator] as string;
      }

      if (valA === null) valA = sortDir === "asc" ? Infinity : -Infinity;
      if (valB === null) valB = sortDir === "asc" ? Infinity : -Infinity;

      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [indicators, statusFilter, pillarFilter, yearFilter, searchQuery, sortKey, sortDir]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filterButtons = [
    { key: "all", label: "All" },
    { key: "improved", label: "Improved" },
    { key: "declined", label: "Declined" },
    { key: "missing", label: "Missing '25" },
  ];

  const yearButtons = [
    { key: "all" as const, label: "All Years" },
    { key: "2023" as const, label: "2023" },
    { key: "2025" as const, label: "2025" },
  ];

  return (
    <div className="bg-card rounded-lg shadow-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">Detailed Indicator Breakdown</h3>
            <span className="text-sm text-muted-foreground">({filteredIndicators.length})</span>
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            <Input
              placeholder="Search code or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48"
            />
            
            <div className="flex gap-1">
              {filterButtons.map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => onStatusFilterChange(btn.key)}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-md border transition-colors",
                    statusFilter === btn.key
                      ? "filter-active"
                      : "border-border bg-background hover:bg-muted"
                  )}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-border" />

            <div className="flex gap-1">
              {yearButtons.map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => setYearFilter(btn.key)}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-md border transition-colors",
                    yearFilter === btn.key
                      ? "bg-secondary text-secondary-foreground border-secondary"
                      : "border-border bg-background hover:bg-muted"
                  )}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <Select value={pillarFilter} onValueChange={setPillarFilter}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="All Pillars" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pillars</SelectItem>
                {pillars.map((pillar, i) => (
                  <SelectItem key={pillar} value={pillar}>
                    {i + 1}. {pillar.split(" ")[0]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th 
                className="text-left px-4 py-3 text-sm font-semibold cursor-pointer hover:bg-muted"
                onClick={() => handleSort("code")}
              >
                Code ↕
              </th>
              <th 
                className="text-left px-4 py-3 text-sm font-semibold cursor-pointer hover:bg-muted"
                onClick={() => handleSort("name")}
              >
                Indicator Name ↕
              </th>
              <th 
                className="text-left px-4 py-3 text-sm font-semibold cursor-pointer hover:bg-muted"
                onClick={() => handleSort("score2023")}
              >
                2023 ↕
              </th>
              <th 
                className="text-left px-4 py-3 text-sm font-semibold cursor-pointer hover:bg-muted"
                onClick={() => handleSort("score2025")}
              >
                2025 ↕
              </th>
              <th 
                className="text-left px-4 py-3 text-sm font-semibold cursor-pointer hover:bg-muted"
                onClick={() => handleSort("diff")}
              >
                Change ↕
              </th>
              <th 
                className="text-left px-4 py-3 text-sm font-semibold cursor-pointer hover:bg-muted"
                onClick={() => handleSort("dataOwner")}
              >
                Data Owner ↕
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold">Source</th>
              <th className="text-left px-4 py-3 text-sm font-semibold">Website</th>
            </tr>
          </thead>
          <tbody>
            {filteredIndicators.map((ind) => {
              const s23 = ind.score2023;
              const s25 = ind.score2025;
              let diff: number | null = null;
              let diffStr = "--";
              let trendClass = "trend-neutral";
              let trendIcon = "";

              if (s25 !== null && s23 !== null) {
                diff = s25 - s23;
                if (diff > 0) {
                  trendClass = "trend-up";
                  trendIcon = "↑";
                  diffStr = `+${diff.toFixed(1)}`;
                } else if (diff < 0) {
                  trendClass = "trend-down";
                  trendIcon = "↓";
                  diffStr = diff.toFixed(1);
                } else {
                  diffStr = "0.0";
                  trendIcon = "→";
                }
              }

              return (
                <tr key={ind.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-sm">{ind.code}</span>
                    {ind.indicatorStatus === "new" && (
                      <span className="ml-2 badge-new text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold">
                        New
                      </span>
                    )}
                    {ind.indicatorStatus === "code-changed" && (
                      <span className="ml-2 badge-changed text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold">
                        Changed
                      </span>
                    )}
                    {ind.indicatorStatus === "replaced" && (
                      <span className="ml-2 badge-replaced text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold">
                        Replaced
                      </span>
                    )}
                    {ind.indicatorStatus === "removed" && (
                      <span className="ml-2 badge-removed text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold">
                        Removed
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {ind.name}
                    {ind.replacedBy && (
                      <div className="text-xs text-muted-foreground mt-0.5 italic">
                        {ind.replacedBy}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 score-mono text-sm">
                    {s23 === null ? "n/a" : s23.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 score-mono text-sm">
                    {s25 === null ? "n/a" : s25.toFixed(2)}
                  </td>
                  <td className={cn("px-4 py-3 score-mono text-sm", trendClass)}>
                    {diffStr} <span className="font-bold">{trendIcon}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground max-w-[200px] truncate">
                    {ind.dataOwner}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground max-w-[200px] truncate" title={ind.source}>
                    {ind.source}
                  </td>
                  <td className="px-4 py-3">
                    {ind.website && (
                      <a 
                        href={`https://${ind.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-secondary/80 inline-flex items-center gap-1 text-sm"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
