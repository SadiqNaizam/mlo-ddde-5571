import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Cookie, Settings, User, LogOut } from 'lucide-react';

// A placeholder for mobile sidebar content, as we are not creating it in this step
// but we need the Sheet component for the header layout.
const MobileSidebarContentPlaceholder = () => (
    <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Navigation</h2>
        <div className="flex flex-col gap-2">
            <Link to="/" className="text-muted-foreground hover:text-primary">Dashboard</Link>
            <Link to="/recipe-management" className="text-muted-foreground hover:text-primary">Recipes</Link>
            <Link to="/inventory-tracking" className="text-muted-foreground hover:text-primary">Inventory</Link>
            <Link to="/baking-schedules" className="text-muted-foreground hover:text-primary">Schedules</Link>
            <Link to="/order-fulfillment" className="text-muted-foreground hover:text-primary">Orders</Link>
        </div>
    </div>
);


const Header: React.FC = () => {
  console.log('Header loaded');

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 w-full">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden">
         <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <div className="flex h-16 items-center border-b px-4 lg:px-6">
                    <Link to="/" className="flex items-center gap-2 font-semibold">
                        <Cookie className="h-6 w-6 text-yellow-600" />
                        <span>Baker's Harmony</span>
                    </Link>
                </div>
                <MobileSidebarContentPlaceholder />
            </SheetContent>
        </Sheet>
      </div>

      <div className="w-full flex-1">
        {/* Placeholder for future elements like a global search bar */}
      </div>

      {/* User Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="@baker" />
              <AvatarFallback>BH</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;