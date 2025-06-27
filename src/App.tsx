import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import BakingSchedules from "./pages/BakingSchedules";
import DashboardAnalytics from "./pages/DashboardAnalytics";
import InventoryTracking from "./pages/InventoryTracking";
import OrderFulfillment from "./pages/OrderFulfillment";
import RecipeManagement from "./pages/RecipeManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<DashboardAnalytics />} />
          <Route path="/baking-schedules" element={<BakingSchedules />} />
          <Route path="/inventory-tracking" element={<InventoryTracking />} />
          <Route path="/order-fulfillment" element={<OrderFulfillment />} />
          <Route path="/recipe-management" element={<RecipeManagement />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
