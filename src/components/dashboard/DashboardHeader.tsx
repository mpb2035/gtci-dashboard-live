import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
}

export function DashboardHeader({ onToggleSidebar }: DashboardHeaderProps) {
  return (
    <header className="header-gradient text-primary-foreground px-6 py-4 flex items-center shadow-lg sticky top-0 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleSidebar}
        className="mr-4 text-primary-foreground hover:bg-primary-foreground/10"
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      <div className="flex-1 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs font-medium opacity-80 uppercase tracking-wide">
            by sfzn
          </span>
          <h1 className="text-xl font-semibold tracking-tight">
            GTCI Dashboard | Brunei Darussalam
          </h1>
        </div>
        
        <div className="text-sm opacity-90 font-medium">
          2023 vs 2025 Comparison
        </div>
      </div>
    </header>
  );
}
