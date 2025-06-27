import React from 'react';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronRight } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Type definitions for order data, can be shared across the app
export type OrderStatus = 'pending' | 'baking' | 'ready-for-pickup' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  status: OrderStatus;
  total: number;
}

interface OrderListItemProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

// Helper to get the appropriate badge variant and class
const getStatusBadgeStyle = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return { variant: 'secondary' as const, className: '' };
    case 'baking':
      return { variant: 'default' as const, className: 'bg-blue-500 hover:bg-blue-600' };
    case 'ready-for-pickup':
      return { variant: 'default' as const, className: 'bg-yellow-500 hover:bg-yellow-600 text-yellow-foreground' };
    case 'completed':
      return { variant: 'default' as const, className: 'bg-green-600 hover:bg-green-700' };
    case 'cancelled':
      return { variant: 'destructive' as const, className: '' };
    default:
      return { variant: 'secondary' as const, className: '' };
  }
};

// Helper to format status text for display
const formatStatusText = (status: OrderStatus) => {
  return status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const OrderListItem: React.FC<OrderListItemProps> = ({ order, onStatusChange }) => {
  const { toast } = useToast();
  console.log('OrderListItem loaded for order:', order.id);

  const handleStatusChange = (newStatus: OrderStatus) => {
    onStatusChange(order.id, newStatus);
    toast({
      title: "Status Updated",
      description: `Order #${order.id} status changed to ${formatStatusText(newStatus)}.`,
    });
  };

  const statusStyle = getStatusBadgeStyle(order.status);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 border-b hover:bg-muted/50 transition-colors gap-4">
      {/* Main Info Section */}
      <div className="flex-1 grid grid-cols-[1fr_auto] sm:flex sm:items-center sm:gap-6 w-full">
        {/* Order Info */}
        <div className="min-w-0 flex-1">
          <p className="font-semibold truncate">{order.customerName}</p>
          <p className="text-sm text-muted-foreground">ID: {order.id}</p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-end sm:justify-start sm:w-36">
          <Badge variant={statusStyle.variant} className={cn('capitalize', statusStyle.className)}>
            {formatStatusText(order.status)}
          </Badge>
        </div>
        
        {/* Total */}
        <div className="hidden md:flex items-center font-semibold w-24">
          ${order.total.toFixed(2)}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <Select onValueChange={(value) => handleStatusChange(value as OrderStatus)} defaultValue={order.status}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Change status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="baking">Baking</SelectItem>
            <SelectItem value="ready-for-pickup">Ready for Pickup</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancel Order</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" className="hidden sm:inline-flex">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">View Details</span>
        </Button>
      </div>
    </div>
  );
};

export default OrderListItem;