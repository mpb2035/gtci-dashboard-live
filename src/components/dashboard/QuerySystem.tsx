import { useState } from "react";
import { indicators, Indicator } from "@/data/indicators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface QueryResult {
  title: string;
  content: React.ReactNode;
}

export function QuerySystem() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<QueryResult | null>(null);

  const generateImprovedReport = () => {
    const improved = indicators.filter(
      (i) => i.score2025 !== null && i.score2023 !== null && i.score2025 - i.score2023 > 0
    );
    return {
      title: "✅ Improved Indicators",
      content: (
        <div>
          <div className="mb-4">
            <span className="font-medium">Total Improved:</span>{" "}
            <span className="text-3xl font-bold text-success">{improved.length}</span>{" "}
            <span className="text-muted-foreground">indicators</span>
          </div>
          <div className="space-y-2">
            {improved.slice(0, 5).map((i) => (
              <div key={i.id} className="flex justify-between text-sm border-b border-border pb-2">
                <span className="font-medium">{i.code} - {i.name}</span>
                <span className="text-success">+{((i.score2025 || 0) - (i.score2023 || 0)).toFixed(2)}</span>
              </div>
            ))}
            {improved.length > 5 && (
              <p className="text-sm text-muted-foreground">...and {improved.length - 5} more</p>
            )}
          </div>
        </div>
      ),
    };
  };

  const generateDeclinedReport = () => {
    const declined = indicators.filter(
      (i) => i.score2025 !== null && i.score2023 !== null && i.score2025 - i.score2023 < 0
    );
    return {
      title: "⚠️ Declined Indicators",
      content: (
        <div>
          <div className="mb-4">
            <span className="font-medium">Total Declined:</span>{" "}
            <span className="text-3xl font-bold text-danger">{declined.length}</span>{" "}
            <span className="text-muted-foreground">indicators</span>
          </div>
          <div className="space-y-2">
            {declined.slice(0, 5).map((i) => (
              <div key={i.id} className="flex justify-between text-sm border-b border-border pb-2">
                <span className="font-medium">{i.code} - {i.name}</span>
                <span className="text-danger">{((i.score2025 || 0) - (i.score2023 || 0)).toFixed(2)}</span>
              </div>
            ))}
            {declined.length > 5 && (
              <p className="text-sm text-muted-foreground">...and {declined.length - 5} more</p>
            )}
          </div>
        </div>
      ),
    };
  };

  const generateMissingReport = () => {
    const missing = indicators.filter(
      (i) => !i.is2023Only && i.indicatorStatus !== "replaced" && (i.score2025 === null || i.score2025 === 0)
    );
    return {
      title: "❌ Missing or Zero Data",
      content: (
        <div>
          <div className="mb-4">
            <span className="font-medium">Missing Data (2025):</span>{" "}
            <span className="text-3xl font-bold text-warning">{missing.length}</span>{" "}
            <span className="text-muted-foreground">indicators with N/A or 0 values</span>
          </div>
          <p className="text-sm text-muted-foreground">
            These indicators require data collection or are marked as 'new' in the 2025 framework.
          </p>
        </div>
      ),
    };
  };

  const generateSourceReport = () => {
    const sources = [...new Set(indicators.filter((i) => i.source).map((i) => i.source))];
    const sourceCount: Record<string, number> = {};
    indicators.forEach((i) => {
      if (i.source) {
        sourceCount[i.source] = (sourceCount[i.source] || 0) + 1;
      }
    });
    const topSources = Object.entries(sourceCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    return {
      title: "📚 Data Sources Report",
      content: (
        <div>
          <div className="mb-4">
            <span className="font-medium">Total Unique Sources:</span>{" "}
            <span className="text-3xl font-bold text-secondary">{sources.length}</span>
          </div>
          <div className="space-y-2">
            {topSources.map(([source, count], idx) => (
              <div key={idx} className="text-sm border-b border-border pb-2">
                <span className="font-medium">{source}</span>
                <span className="ml-2 text-muted-foreground">({count} indicators)</span>
              </div>
            ))}
          </div>
        </div>
      ),
    };
  };

  const generateMinistryReport = () => {
    const ministries: Record<string, number> = {};
    indicators.forEach((i) => {
      if (i.dataOwner) {
        ministries[i.dataOwner] = (ministries[i.dataOwner] || 0) + 1;
      }
    });
    const sorted = Object.entries(ministries).sort((a, b) => b[1] - a[1]);

    return {
      title: "🏛️ Government Agencies Responsible",
      content: (
        <div>
          <div className="mb-4">
            <span className="font-medium">Government Departments:</span>{" "}
            <span className="text-3xl font-bold text-purple-600">{sorted.length}</span>{" "}
            <span className="text-muted-foreground">agencies</span>
          </div>
          <div className="space-y-2">
            {sorted.slice(0, 10).map(([ministry, count], idx) => (
              <div key={idx} className="text-sm border-b border-border pb-2 flex justify-between">
                <span className="font-medium">{ministry}</span>
                <span className="text-secondary">{count} indicators</span>
              </div>
            ))}
          </div>
        </div>
      ),
    };
  };

  const processQuery = (q: string) => {
    const lower = q.toLowerCase();
    if (lower.includes("improve")) return generateImprovedReport();
    if (lower.includes("decline")) return generateDeclinedReport();
    if (lower.includes("miss") || lower.includes("no data")) return generateMissingReport();
    if (lower.includes("source") || lower.includes("database")) return generateSourceReport();
    if (lower.includes("ministry") || lower.includes("department") || lower.includes("owner"))
      return generateMinistryReport();

    // General search
    const matched = indicators.filter(
      (i) => i.name.toLowerCase().includes(lower) || i.code.toLowerCase().includes(lower)
    ).slice(0, 5);

    return {
      title: "🔍 Search Results",
      content: matched.length ? (
        <div className="space-y-2">
          {matched.map((i) => (
            <div key={i.id} className="text-sm border-b border-border pb-2">
              <span className="font-semibold">{i.code}</span>: {i.name}
              <br />
              <span className="text-muted-foreground text-xs">Owner: {i.dataOwner || "N/A"}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No indicators found matching "{q}"</p>
      ),
    };
  };

  const handleQuery = () => {
    if (!query.trim()) return;
    setResult(processQuery(query));
  };

  const suggestedQueries = [
    { key: "improved", label: "Improved Indicators", color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" },
    { key: "data_owners", label: "Data Owners", color: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100" },
    { key: "sources", label: "Data Sources", color: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" },
    { key: "ministries", label: "All Ministries", color: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100" },
    { key: "missing", label: "Missing Data", color: "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100" },
  ];

  const handleSuggested = (key: string) => {
    const queries: Record<string, string> = {
      improved: "How many indicators improved from 2023 to 2025?",
      data_owners: "Which ministries manage GTCI indicators?",
      sources: "List all data sources used",
      ministries: "What government departments provide data?",
      missing: "Which indicators have no 2025 data?",
    };
    setQuery(queries[key] || "");
    setResult(processQuery(queries[key] || ""));
  };

  return (
    <div className="query-gradient rounded-lg p-6 mb-8 border-b-2 border-secondary">
      <h2 className="text-xl font-semibold text-primary mb-1">📊 Intelligent Data Query System</h2>
      <p className="text-muted-foreground text-sm mb-4">
        Ask natural language questions about GTCI indicators, data owners, ministries, and data sources
      </p>

      <div className="flex gap-2 mb-4">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., 'How many indicators improved?' 'Which ministry manages education?'"
          className="flex-1"
          onKeyDown={(e) => e.key === "Enter" && handleQuery()}
        />
        <Button onClick={handleQuery} className="bg-secondary hover:bg-secondary/90">
          <Search className="h-4 w-4 mr-2" />
          Query
        </Button>
        <Button variant="secondary" onClick={() => { setResult(null); setQuery(""); }}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {result && (
        <div className="bg-card border-l-4 border-secondary p-4 rounded-lg shadow-card mb-4 animate-fade-in">
          <h3 className="font-semibold text-primary mb-3">{result.title}</h3>
          <div>{result.content}</div>
        </div>
      )}

      <div className="pt-4 border-t border-border/50">
        <p className="text-sm text-muted-foreground font-medium mb-2">📌 Try these example queries:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedQueries.map((sq) => (
            <button
              key={sq.key}
              onClick={() => handleSuggested(sq.key)}
              className={`px-3 py-1.5 text-sm rounded border transition-colors ${sq.color}`}
            >
              {sq.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
