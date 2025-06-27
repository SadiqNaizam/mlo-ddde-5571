import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';

// --- Mock Data and Types ---
type BakingStatus = 'planned' | 'in-progress' | 'completed';

interface BakingTask {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:mm
  status: BakingStatus;
}

const mockBakingTasks: BakingTask[] = [
  { id: 1, title: 'Sourdough Starters', date: new Date().toISOString().slice(0, 10), startTime: '06:00', status: 'completed' },
  { id: 2, title: 'Baguette Mixing', date: new Date().toISOString().slice(0, 10), startTime: '08:30', status: 'in-progress' },
  { id: 3, title: 'Croissant Lamination', date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10), startTime: '07:00', status: 'planned' },
  { id: 4, title: 'Muffin Batch #1', date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().slice(0, 10), startTime: '09:00', status: 'completed' },
  { id: 5, title: 'Cake Decoration', date: new Date().toISOString().slice(0, 10), startTime: '14:00', status: 'planned' },
];

// --- Helper Functions ---
const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
};

const statusColors: Record<BakingStatus, string> = {
    planned: 'bg-blue-100 text-blue-800 border-blue-300',
    'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    completed: 'bg-green-100 text-green-800 border-green-300',
};


// --- Component ---
const ScheduleCalendarView: React.FC = () => {
    console.log('ScheduleCalendarView loaded');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<'month' | 'week' | 'day'>('month');

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const calendarGrid = useMemo(() => {
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const grid = [];
        let dayCounter = 1;

        // Create 6 rows for a consistent grid size
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    grid.push({ key: `empty-start-${j}`, day: null, isCurrentMonth: false });
                } else if (dayCounter > daysInMonth) {
                    grid.push({ key: `empty-end-${dayCounter}`, day: null, isCurrentMonth: false });
                } else {
                    const date = new Date(year, month, dayCounter);
                    const dateString = date.toISOString().slice(0, 10);
                    const tasksForDay = mockBakingTasks.filter(task => task.date === dateString);
                    grid.push({ key: dateString, day: dayCounter, date, isCurrentMonth: true, tasks: tasksForDay });
                    dayCounter++;
                }
            }
        }
        return grid;
    }, [year, month]);

    const handlePrev = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNext = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const renderMonthView = () => (
        <>
            <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day}>{day}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 grid-rows-6 border-t border-l h-[calc(100vh-200px)]">
                {calendarGrid.map(cell => {
                    const isToday = cell.date?.toDateString() === new Date().toDateString();
                    return (
                        <div key={cell.key} className={`border-b border-r p-2 flex flex-col ${cell.isCurrentMonth ? 'bg-white' : 'bg-gray-50'}`}>
                            <span className={`font-medium mb-1 ${isToday ? 'bg-indigo-600 text-white rounded-full w-7 h-7 flex items-center justify-center' : ''} ${!cell.isCurrentMonth ? 'text-gray-400' : ''}`}>
                                {cell.day}
                            </span>
                            <div className="space-y-1 overflow-y-auto">
                                {cell.tasks?.map(task => (
                                    <Badge key={task.id} variant="outline" className={`w-full justify-start text-xs p-1 truncate ${statusColors[task.status]}`}>
                                        {task.startTime} - {task.title}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );

    // Placeholder for other views
    const renderWeekView = () => <div className="text-center p-10">Week View not implemented yet.</div>;
    const renderDayView = () => <div className="text-center p-10">Day View not implemented yet.</div>;

    return (
        <Card className="w-full h-full shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                    <CardTitle className="text-2xl">Baking Schedule</CardTitle>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="icon" onClick={handlePrev}><ChevronLeft className="h-4 w-4" /></Button>
                        <Button variant="outline" onClick={handleToday}>Today</Button>
                        <Button variant="outline" size="icon" onClick={handleNext}><ChevronRight className="h-4 w-4" /></Button>
                    </div>
                    <span className="text-xl font-semibold text-gray-700">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                    <ToggleGroup type="single" value={view} onValueChange={(value: 'month' | 'week' | 'day') => value && setView(value)}>
                        <ToggleGroupItem value="month">Month</ToggleGroupItem>
                        <ToggleGroupItem value="week">Week</ToggleGroupItem>
                        <ToggleGroupItem value="day">Day</ToggleGroupItem>
                    </ToggleGroup>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Task
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                {view === 'month' && renderMonthView()}
                {view === 'week' && renderWeekView()}
                {view === 'day' && renderDayView()}
            </CardContent>
        </Card>
    );
};

export default ScheduleCalendarView;