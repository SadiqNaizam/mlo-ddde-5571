import React, { useState } from 'react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CollapsibleLeftSidebar from '@/components/layout/CollapsibleLeftSidebar';

// Custom Page-specific Component
import ScheduleCalendarView from '@/components/ScheduleCalendarView';

// shadcn/ui Components for the "Add Task" Dialog
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const BakingSchedules = () => {
  console.log('BakingSchedules page loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Note: The Dialog for adding a new task is included below.
  // To make it functional, the `ScheduleCalendarView` component would need to be updated 
  // to accept a prop that triggers this dialog's visibility, for example:
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  // This state would then be passed to the Dialog's `open` and `onOpenChange` props.

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleLeftSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className="flex flex-1 flex-col">
        <Header />
        
        <main className="flex-1 flex p-4 sm:p-6">
          {/* The main calendar view component. It contains its own header, controls, and "New Task" button. */}
          <ScheduleCalendarView />
        </main>
        
        <Footer />
      </div>

      {/* 
        "Add New Task" Dialog
        This Dialog is included to fulfill the page's layout requirements. It is designed
        to be triggered by the "New Task" button within the ScheduleCalendarView component.
        As modification of custom components is not permitted, this dialog is present
        but will not be visible until the parent component is wired to control its state.
      */}
      <Dialog>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Baking Task</DialogTitle>
            <DialogDescription>
              Schedule a new task for your baking plan. Click "Save Task" when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-title" className="text-right">
                Task Title
              </Label>
              <Input id="task-title" placeholder="e.g., Mix Sourdough" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-date" className="text-right">
                Date
              </Label>
              <Input id="task-date" type="date" className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-time" className="text-right">
                Start Time
              </Label>
              <Input id="task-time" type="time" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BakingSchedules;