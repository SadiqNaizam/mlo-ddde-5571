import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import {
  LayoutDashboard,
  BookHeart,
  ClipboardList,
  CalendarClock,
  ListOrdered,
  ChevronsLeft,
  Cookie,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsibleLeftSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/recipe-management', label: 'Recipes', icon: BookHeart },
  { to: '/inventory-tracking', label: 'Inventory', icon: ClipboardList },
  { to: '/baking-schedules', label: 'Schedules', icon: CalendarClock },
  { to: '/order-fulfillment', label: 'Orders', icon: ListOrdered },
];

const CollapsibleLeftSidebar: React.FC<CollapsibleLeftSidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  console.log('CollapsibleLeftSidebar loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center justify-start gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
      { "bg-muted text-primary": isActive },
      { "w-full justify-center": isCollapsed }
    );

  return (
    <TooltipProvider delayDuration={0}>
      <aside className={cn(
        "hidden border-r bg-muted/40 md:flex md:flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}>
        <div className="flex h-16 items-center border-b px-4 lg:px-6 justify-between">
            <NavLink to="/" className={cn("flex items-center gap-2 font-semibold", isCollapsed && "justify-center w-full")}>
                <Cookie className="h-6 w-6 text-yellow-600" />
                <span className={cn(isCollapsed && "hidden")}>Baker's Harmony</span>
            </NavLink>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map(({ to, label, icon: Icon }) => (
            isCollapsed ? (
              <Tooltip key={to}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={to}
                    className={navLinkClasses}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{label}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <NavLink
                key={to}
                to={to}
                className={navLinkClasses}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </NavLink>
            )
          ))}
        </nav>
        <div className="mt-auto p-4">
           <Button
              variant="ghost"
              size="icon"
              className="w-full justify-center"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <ChevronsLeft className={cn("h-5 w-5 transition-transform duration-300", !isCollapsed && "rotate-180")} />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default CollapsibleLeftSidebar;