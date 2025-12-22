import { cn } from "@/lib/utils";
import { LayoutDashboard, Database, LayoutGrid } from "lucide-react";

interface TabNavigationProps {
  activeTab: "dashboard" | "pillars" | "source";
  onTabChange: (tab: "dashboard" | "pillars" | "source") => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "pillars" as const, label: "Pillars", icon: LayoutGrid },
    { id: "source" as const, label: "Source", icon: Database },
  ];

  return (
    <nav className="bg-card border-b border-border px-6 flex gap-1 sticky top-[73px] z-40">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "py-4 px-5 font-semibold text-sm transition-all flex items-center gap-2 border-b-2",
              activeTab === tab.id
                ? "text-secondary border-secondary"
                : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50"
            )}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
