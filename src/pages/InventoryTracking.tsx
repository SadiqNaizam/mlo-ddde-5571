import React, { useState } from 'react';

// Layout Components
import CollapsibleLeftSidebar from '@/components/layout/CollapsibleLeftSidebar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Components
import IngredientLevelWidget from '@/components/IngredientLevelWidget';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Icons
import { PlusCircle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

// Placeholder data for ingredients
const initialIngredients = [
  { id: '1', name: 'All-Purpose Flour', currentStock: 20, maxStock: 50, unit: 'kg', reorderLevel: 10 },
  { id: '2', name: 'Granulated Sugar', currentStock: 15, maxStock: 25, unit: 'kg', reorderLevel: 5 },
  { id: '3', name: 'Unsalted Butter', currentStock: 5, maxStock: 20, unit: 'kg', reorderLevel: 4 },
  { id: '4', name: 'Large Eggs', currentStock: 12, maxStock: 144, unit: 'dozen', reorderLevel: 2 },
  { id: '5', name: 'Dark Chocolate Chips', currentStock: 1.5, maxStock: 10, unit: 'kg', reorderLevel: 2 },
  { id: '6', name: 'Active Dry Yeast', currentStock: 0.4, maxStock: 1, unit: 'kg', reorderLevel: 0.5 },
  { id: '7', name: 'Sea Salt', currentStock: 3, maxStock: 5, unit: 'kg', reorderLevel: 1 },
];

type Ingredient = typeof initialIngredients[0];

const InventoryTracking = () => {
  console.log('InventoryTrackingPage loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialIngredients);
  
  const getStatus = (item: Ingredient) => {
    if (item.currentStock <= 0) return { text: "Out of Stock", variant: "destructive" as const };
    if (item.currentStock <= item.reorderLevel) return { text: "Low Stock", variant: "destructive" as const };
    return { text: "In Stock", variant: "secondary" as const };
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr] bg-muted/40">
      <CollapsibleLeftSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex flex-col max-h-screen overflow-y-auto">
        <Header />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between pt-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-800">Inventory Management</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Ingredient
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Ingredient</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the new ingredient to track in your inventory.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" placeholder="e.g., All-Purpose Flour" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">Quantity</Label>
                    <Input id="quantity" type="number" placeholder="25" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="unit" className="text-right">Unit</Label>
                    <Input id="unit" placeholder="kg, lbs, dozen" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Ingredient</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Key Ingredient Widgets */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Key Stock Levels</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {ingredients.slice(0, 6).map(item => (
                <IngredientLevelWidget 
                  key={item.id}
                  label={item.name}
                  currentAmount={item.currentStock}
                  maxAmount={item.maxStock}
                  unit={item.unit}
                />
              ))}
            </div>
          </section>

          {/* Full Inventory Table */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Full Inventory List</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ingredient</TableHead>
                      <TableHead className="w-[150px]">Current Stock</TableHead>
                      <TableHead className="w-[200px]">Stock Level</TableHead>
                      <TableHead className="w-[120px]">Status</TableHead>
                      <TableHead className="w-[50px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ingredients.map((item) => {
                      const status = getStatus(item);
                      const progressValue = item.maxStock > 0 ? (item.currentStock / item.maxStock) * 100 : 0;
                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.currentStock} {item.unit}</TableCell>
                          <TableCell>
                            <Progress value={progressValue} className="w-full" />
                          </TableCell>
                          <TableCell>
                            <Badge variant={status.variant}>{status.text}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default InventoryTracking;