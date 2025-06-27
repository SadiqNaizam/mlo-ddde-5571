import React, { useState, useMemo } from 'react';

// Layout Components
import CollapsibleLeftSidebar from '@/components/layout/CollapsibleLeftSidebar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Component for Order Rows
import OrderListItem, { Order, OrderStatus } from '@/components/OrderListItem';

// shadcn/ui Components for UI structure and controls
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

// Sample data for demonstration
const initialOrders: Order[] = [
  { id: 'ORD-001', customerName: 'Alice Johnson', status: 'ready-for-pickup', total: 45.50 },
  { id: 'ORD-002', customerName: 'Bob Williams', status: 'baking', total: 22.00 },
  { id: 'ORD-003', customerName: 'Charlie Brown', status: 'completed', total: 15.75 },
  { id: 'ORD-004', customerName: 'Diana Prince', status: 'pending', total: 30.00 },
  { id: 'ORD-005', customerName: 'Ethan Hunt', status: 'baking', total: 55.25 },
  { id: 'ORD-006', customerName: 'Fiona Glenanne', status: 'cancelled', total: 18.00 },
  { id: 'ORD-007', customerName: 'George Costanza', status: 'pending', total: 8.50 },
  { id: 'ORD-008', customerName: 'Hannah Montana', status: 'completed', total: 72.00 },
];

const OrderFulfillment = () => {
  console.log('OrderFulfillment page loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>('all');

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(currentOrders =>
      currentOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = useMemo(() => {
    return orders
      .filter(order => activeTab === 'all' || order.status === activeTab)
      .filter(order => order.customerName.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [orders, activeTab, searchTerm]);

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleLeftSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4 sm:p-6 flex flex-col gap-4">
          <header>
            <h1 className="text-2xl font-bold tracking-tight">Order Fulfillment</h1>
            <p className="text-muted-foreground">Manage and track all customer orders.</p>
          </header>

          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by customer name..."
                  className="w-full pl-8 sm:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as OrderStatus | 'all')}>
                <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="baking">Baking</TabsTrigger>
                  <TabsTrigger value="ready-for-pickup">Ready</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>

                <div className="border rounded-lg overflow-hidden flex-1 flex flex-col">
                   {/* Manual Header for the list */}
                   <div className="hidden md:flex items-center p-4 border-b bg-muted/50 font-medium text-sm text-muted-foreground">
                        <div className="flex-1 grid grid-cols-[1fr_auto] sm:flex sm:items-center sm:gap-6 w-full">
                            <div className="min-w-0 flex-1">Customer / Order ID</div>
                            <div className="flex items-center justify-start sm:w-36">Status</div>
                            <div className="hidden md:flex items-center w-24">Total</div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:w-[204px]">
                            <span className="text-center w-full">Update Status</span>
                        </div>
                    </div>
                  <div className="flex-1 overflow-y-auto">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map(order => (
                        <OrderListItem key={order.id} order={order} onStatusChange={handleStatusChange} />
                      ))
                    ) : (
                      <div className="flex items-center justify-center h-full p-8">
                        <p className="text-muted-foreground">No orders match your criteria.</p>
                      </div>
                    )}
                  </div>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default OrderFulfillment;