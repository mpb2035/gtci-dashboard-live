import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, ArrowUpDown, ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import { cn } from "@/lib/utils";
import { indicators } from "@/data/indicators";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SortDirection = "asc" | "desc" | null;

interface SortConfig {
  column: number;
  direction: SortDirection;
}

// Create a map from indicator code to indicator name
const indicatorCodeToName: Record<string, string> = {};
indicators.forEach(ind => {
  indicatorCodeToName[ind.code] = ind.name;
});

export function SourceViewer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [excelData, setExcelData] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ column: -1, direction: null });

  useEffect(() => {
    async function loadExcelData() {
      try {
        setLoading(true);
        const response = await fetch("/gtci-data.xlsx");
        if (!response.ok) throw new Error("Could not load gtci-data.xlsx");
        
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        const jsonData: string[][] = XLSX.utils.sheet_to_json(worksheet, { 
          header: 1,
          defval: ""
        });
        
        if (jsonData.length > 0) {
          setHeaders(jsonData[0].map(String));
          setExcelData(jsonData.slice(1).map(row => row.map(String)));
        }
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Failed to load Excel file");
        setLoading(false);
      }
    }
    
    loadExcelData();
  }, []);

  const handleSort = (columnIndex: number) => {
    setSortConfig(prev => {
      if (prev.column === columnIndex) {
        // Cycle through: asc -> desc -> null
        if (prev.direction === "asc") return { column: columnIndex, direction: "desc" };
        if (prev.direction === "desc") return { column: -1, direction: null };
      }
      return { column: columnIndex, direction: "asc" };
    });
  };

  const getSortIcon = (columnIndex: number) => {
    if (sortConfig.column !== columnIndex) {
      return <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />;
    }
    if (sortConfig.direction === "asc") {
      return <ArrowUp className="h-3.5 w-3.5 text-secondary" />;
    }
    return <ArrowDown className="h-3.5 w-3.5 text-secondary" />;
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...excelData];

    // Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(row => 
        row.some(cell => cell.toLowerCase().includes(query))
      );
    }

    // Sort
    if (sortConfig.column >= 0 && sortConfig.direction) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.column] || "";
        const bVal = b[sortConfig.column] || "";
        
        // Try numeric sort first
        const aNum = parseFloat(aVal);
        const bNum = parseFloat(bVal);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortConfig.direction === "asc" ? aNum - bNum : bNum - aNum;
        }
        
        // Fall back to string sort
        const comparison = aVal.localeCompare(bVal, undefined, { numeric: true, sensitivity: "base" });
        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [excelData, searchQuery, sortConfig]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/gtci-data.xlsx";
    link.download = "gtci-data.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-[400px]">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading Excel data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 text-center">
          <p className="text-destructive font-medium">⚠️ Error loading Excel file</p>
          <p className="text-sm text-muted-foreground mt-2">{error}</p>
          <p className="text-xs text-muted-foreground mt-4">
            Make sure 'gtci-data.xlsx' is in the public folder.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6 bg-card p-4 rounded-lg shadow-card">
        <div className="flex gap-4 items-center">
          <h2 className="text-xl font-semibold text-primary">Source Data Viewer</h2>
          <Input
            placeholder="Search in source data..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-72"
          />
          <span className="text-sm text-muted-foreground">
            {filteredAndSortedData.length} of {excelData.length} rows
          </span>
        </div>
        <Button onClick={handleDownload} className="gap-2">
          <Download className="h-4 w-4" />
          Export Excel
        </Button>
      </div>

      {/* Sort Instructions */}
      <div className="mb-4 text-sm text-muted-foreground flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4" />
        Click any column header to sort. Click again to reverse. Click a third time to clear.
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg shadow-card overflow-hidden">
        <div className="overflow-x-auto max-h-[calc(100vh-280px)]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="bg-muted border-b border-border">
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    onClick={() => handleSort(idx)}
                    className={cn(
                      "text-left px-4 py-3 font-semibold cursor-pointer transition-colors select-none",
                      "hover:bg-muted-foreground/10",
                      sortConfig.column === idx && "bg-secondary/10"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="truncate">{header}</span>
                      {getSortIcon(idx)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((row, rowIdx) => (
                <tr 
                  key={rowIdx} 
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  {headers.map((_, colIdx) => (
                    <td 
                      key={colIdx} 
                      className={cn(
                        "px-4 py-3",
                        colIdx === 0 && "font-medium text-center", // First column bold
                        colIdx === 2 && "score-mono text-center", // Indicator count
                        sortConfig.column === colIdx && "bg-secondary/5"
                      )}
                    >
                      {colIdx === headers.length - 1 && row[colIdx] ? (
                        // Last column as clickable link
                        <a 
                          href={`https://${row[colIdx].replace(/\\/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary hover:underline truncate block max-w-[250px]"
                        >
                          {row[colIdx].replace(/\\/g, "")}
                        </a>
                      ) : colIdx === 3 ? (
                        // Indicator codes column - show all codes with wrapping and tooltip
                        <TooltipProvider delayDuration={100}>
                          <div className="flex flex-wrap gap-1">
                            {row[colIdx].split(",").map((code, i) => {
                              const trimmedCode = code.trim();
                              const indicatorName = indicatorCodeToName[trimmedCode] || "Unknown indicator";
                              return (
                                <Tooltip key={i}>
                                  <TooltipTrigger asChild>
                                    <span 
                                      className="inline-block px-1.5 py-0.5 bg-secondary/10 text-secondary text-xs rounded font-mono whitespace-nowrap cursor-help hover:bg-secondary/20 transition-colors"
                                    >
                                      {trimmedCode}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent side="top" className="max-w-xs">
                                    <p className="font-medium">{trimmedCode}</p>
                                    <p className="text-muted-foreground">{indicatorName}</p>
                                  </TooltipContent>
                                </Tooltip>
                              );
                            })}
                          </div>
                        </TooltipProvider>
                      ) : (
                        <span className={cn(
                          colIdx === 1 && "max-w-[400px] block"
                        )} title={row[colIdx]}>
                          {row[colIdx] || "–"}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredAndSortedData.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No data found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
