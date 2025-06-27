import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from '@/components/ui/scroll-area';
import { DollarSign, ListOrdered, Cookie, Users } from 'lucide-react';

// Custom Components
import Header from '@/components/layout/Header';
import CollapsibleLeftSidebar from '@/components/layout/CollapsibleLeftSidebar';
import Footer from '@/components/layout/Footer';
import AnalyticsChart from '@/components/AnalyticsChart';
import IngredientLevelWidget from '@/components/IngredientLevelWidget';

// Placeholder data for the analytics chart
const salesData = [
  { date: 'Jan', revenue: 2300, orders: 120 },
  { date: 'Feb', revenue: 2800, orders: 140 },
  { date: 'Mar', revenue: 3500, orders: 175 },
  { date: 'Apr', revenue: 3200, orders: 160 },
  { date: 'May', revenue: 4100, orders: 205 },
  { date: 'Jun', revenue: 4500, orders: 225 },
];

// Configuration for the chart lines
const chartLines = [
  { dataKey: 'revenue', name: 'Revenue', color: 'hsl(var(--primary))' },
  { dataKey: 'orders', name: 'Orders', color: 'hsl(var(--secondary-foreground))' },
];

const DashboardAnalytics = () => {
  console.log('DashboardAnalytics loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleLeftSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex flex-1 flex-col">
        <Header />
        <ScrollArea className="flex-1">
          <main className="grid flex-1 items-start gap-6 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,250.00</div>
                    <p className="text-xs text-muted-foreground">+15% from yesterday</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Orders</CardTitle>
                    <ListOrdered className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+32</div>
                    <p className="text-xs text-muted-foreground">+8% from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Items Baked</CardTitle>
                    <Cookie className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">215</div>
                    <p className="text-xs text-muted-foreground">Sourdough is the top item</p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Online Visitors</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">842</div>
                    <p className="text-xs text-muted-foreground">Highest traffic at 8 AM</p>
                  </CardContent>
                </Card>
              </div>

              <AnalyticsChart
                title="Sales Trends"
                description="Monthly revenue and order volume overview."
                data={salesData}
                dataKeyX="date"
                lines={chartLines}
                yAxisFormatter={(value) => `$${Number(value) / 1000}k`}
              />

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Today's Baking Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                      <li><strong>6:00 AM:</strong> 50 Sourdough Loaves</li>
                      <li><strong>8:00 AM:</strong> 100 Croissants (Plain & Almond)</li>
                      <li><strong>10:00 AM:</strong> 75 Chocolate Chip Cookies</li>
                      <li><strong>12:00 PM:</strong> 40 Focaccia Slabs</li>
                      <li><strong>2:00 PM:</strong> Final pastry bake</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Low Stock Ingredients</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap items-center justify-around gap-4 pt-6">
                    <IngredientLevelWidget label="Organic Flour" currentAmount={12} maxAmount={50} unit="kg" />
                    <IngredientLevelWidget label="Cane Sugar" currentAmount={8} maxAmount={25} unit="kg" />
                    <IngredientLevelWidget label="Butter" currentAmount={4} maxAmount={40} unit="blocks" />
                    <IngredientLevelWidget label="Belgian Chocolate" currentAmount={25} maxAmount={30} unit="kg" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </ScrollArea>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardAnalytics;