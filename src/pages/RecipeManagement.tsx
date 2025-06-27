import React, { useState } from 'react';
import { PlusCircle, Search } from 'lucide-react';

// Custom Layout Components
import CollapsibleLeftSidebar from '@/components/layout/CollapsibleLeftSidebar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Page-specific Components
import RecipeCard from '@/components/RecipeCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

// Placeholder data for recipe cards
const sampleRecipes = [
  {
    id: 1,
    title: 'Artisan Sourdough Loaf',
    imageUrl: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=2070&auto=format&fit=crop',
    prepTime: '24 hours',
    category: 'Bread',
  },
  {
    id: 2,
    title: 'Classic French Croissants',
    imageUrl: 'https://images.unsplash.com/photo-1579523348821-3c99a8111a49?q=80&w=1974&auto=format&fit=crop',
    prepTime: '3 hours',
    category: 'Pastry',
  },
  {
    id: 3,
    title: 'Blueberry & Lemon Scones',
    imageUrl: 'https://images.unsplash.com/photo-1621939522104-5852aca5e574?q=80&w=1974&auto=format&fit=crop',
    prepTime: '45 mins',
    category: 'Scones',
  },
  {
    id: 4,
    title: 'Chocolate Fudge Brownies',
    imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1974&auto=format&fit=crop',
    prepTime: '60 mins',
    category: 'Dessert',
  },
    {
    id: 5,
    title: 'Seeded Rye Bread',
    imageUrl: 'https://images.unsplash.com/photo-1533630495823-39857a2c5319?q=80&w=1974&auto=format&fit=crop',
    prepTime: '3.5 hours',
    category: 'Bread',
  },
  {
    id: 6,
    title: 'Almond & Pear Tart',
    imageUrl: 'https://images.unsplash.com/photo-1627283400249-a2e6e3d23b9d?q=80&w=1974&auto=format&fit=crop',
    prepTime: '1.5 hours',
    category: 'Pastry',
  },
];

const RecipeManagement = () => {
  console.log('RecipeManagement page loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleLeftSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 flex-1">
        <Header />
        <ScrollArea className="flex-1">
            <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-serif font-semibold md:text-3xl text-stone-800">Recipe Book</h1>
                    <p className="text-muted-foreground">Manage your collection of artisan recipes.</p>
                </div>
                <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search recipes..." className="pl-8 w-48 md:w-64" />
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                    <Button size="sm" className="h-9 gap-1">
                        <PlusCircle className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Recipe</span>
                    </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="font-serif">Add New Recipe</DialogTitle>
                        <DialogDescription>
                        Fill in the details for your new creation. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" placeholder="e.g., Sourdough Bread" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">Category</Label>
                        <Input id="category" placeholder="e.g., Bread" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="prepTime" className="text-right">Prep Time</Label>
                        <Input id="prepTime" placeholder="e.g., 2 hours" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
                        <Input id="imageUrl" placeholder="https://..." className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                           <Label htmlFor="instructions" className="text-right pt-2">Instructions</Label>
                           <Textarea id="instructions" placeholder="1. Mix flour and water..." className="col-span-3" rows={5}/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save Recipe</Button>
                    </DialogFooter>
                    </DialogContent>
                </Dialog>
                </div>
            </div>

            {/* Recipe Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sampleRecipes.map((recipe) => (
                <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    title={recipe.title}
                    imageUrl={recipe.imageUrl}
                    prepTime={recipe.prepTime}
                    category={recipe.category}
                />
                ))}
            </div>
            </main>
        </ScrollArea>
        <Footer />
      </div>
    </div>
  );
};

export default RecipeManagement;