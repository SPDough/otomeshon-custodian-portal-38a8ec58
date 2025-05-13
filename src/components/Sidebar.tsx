
import { History, User, FileText, Briefcase, Shield, TrendingUp, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface HistoryItem {
  id: string;
  query: string;
  date: string;
}

const mockHistoryItems: HistoryItem[] = [
  { id: "1", query: "Portfolio allocation analysis", date: "2025-05-13" },
  { id: "2", query: "Q1 performance metrics", date: "2025-05-12" },
  { id: "3", query: "ESG compliance reports", date: "2025-05-10" },
  { id: "4", query: "Asset under management summary", date: "2025-05-09" },
  { id: "5", query: "Risk exposure metrics", date: "2025-05-08" },
];

interface AgentItem {
  id: string;
  name: string;
  icon: React.ElementType;
}

const agentItems: AgentItem[] = [
  { id: "1", name: "Confirms", icon: Check },
  { id: "2", name: "Settlements", icon: FileText },
  { id: "3", name: "Corporate Actions", icon: Briefcase },
  { id: "4", name: "Risk", icon: Shield },
  { id: "5", name: "Performance", icon: TrendingUp },
];

const Sidebar = () => {
  return (
    <div className="flex h-full flex-col bg-purple-50 border-r border-purple-200 w-64">
      <div className="p-4">
        <h2 className="text-sm font-medium text-purple-900 flex items-center gap-2 mb-2">
          <User size={16} /> Agents
        </h2>
        <div className="space-y-1">
          {agentItems.map((agent) => (
            <Button 
              key={agent.id} 
              variant="ghost" 
              className="w-full justify-start text-purple-700 hover:bg-purple-100 hover:text-purple-900"
            >
              <agent.icon className="mr-2 h-4 w-4" />
              {agent.name}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="border-t border-purple-200 mt-2"></div>
      
      <div className="flex-1 overflow-hidden">
        <div className="p-4 pb-2">
          <h2 className="text-sm font-medium text-purple-900 flex items-center gap-2">
            <History size={16} /> History
          </h2>
        </div>
        <ScrollArea className="h-full px-2">
          <div className="space-y-1 p-2">
            {mockHistoryItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start text-sm text-purple-700 hover:bg-purple-100 hover:text-purple-900"
              >
                <div className="truncate">
                  {item.query}
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;
