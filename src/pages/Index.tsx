import { useState } from "react";
import { Helmet } from "react-helmet";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TabNavigation } from "@/components/dashboard/TabNavigation";
import { DataSidebar } from "@/components/dashboard/DataSidebar";
import { RankingBoard } from "@/components/dashboard/RankingBoard";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { PillarCharts } from "@/components/dashboard/PillarCharts";
import { IndicatorTable } from "@/components/dashboard/IndicatorTable";
import { QuerySystem } from "@/components/dashboard/QuerySystem";
import { SourceViewer } from "@/components/dashboard/SourceViewer";
import { PillarsBento } from "@/components/dashboard/PillarsBento";
import { indicators, getIndicatorStats } from "@/data/indicators";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "pillars" | "source">("dashboard");
  const [statusFilter, setStatusFilter] = useState("all");

  const stats = getIndicatorStats(indicators);
  const netChange = -0.26; // Official score change from 51.74 to 51.48

  return (
    <>
      <Helmet>
        <title>GTCI Comparison Dashboard | Brunei Darussalam</title>
        <meta
          name="description"
          content="Global Talent Competitiveness Index (GTCI) Dashboard comparing Brunei Darussalam's performance between 2023 and 2025. Analyze indicators, rankings, and data sources."
        />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <DashboardHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex flex-1 overflow-hidden">
          {activeTab === "dashboard" && <DataSidebar isOpen={sidebarOpen} />}

          {activeTab === "dashboard" ? (
            <main className="flex-1 overflow-y-auto p-6 bg-background">
              <QuerySystem />
              
              <RankingBoard
                rank2023={41}
                rank2025={43}
                score2023="51.74"
                score2025="51.48"
              />

              <SummaryCards
                netChange={netChange}
                improved={stats.improved}
                declined={stats.declined}
                missing={stats.missing}
                onFilterChange={setStatusFilter}
              />

              <PillarCharts />

              <IndicatorTable
                indicators={indicators}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
              />
            </main>
          ) : activeTab === "pillars" ? (
            <main className="flex-1 overflow-y-auto bg-background">
              <PillarsBento />
            </main>
          ) : (
            <main className="flex-1 overflow-y-auto bg-background">
              <SourceViewer />
            </main>
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
