import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Shipments from './pages/Shipments';
import Reports from './pages/Reports';
import InboundManagement from './pages/warehouse/InboundManagement';
import OutboundManagement from './pages/warehouse/OutboundManagement';
import Locations from './pages/warehouse/Locations';
import WarehouseInventory from './pages/warehouse/Inventory';
import Picking from './pages/warehouse/Picking';
import Tasks from './pages/warehouse/Tasks';

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {user?.role === 'warehouse' ? (
            <>
              <Route index element={<Dashboard />} />
              <Route path="inbound" element={<InboundManagement />} />
              <Route path="outbound" element={<OutboundManagement />} />
              <Route path="locations" element={<Locations />} />
              <Route path="inventory" element={<WarehouseInventory />} />
              <Route path="picking" element={<Picking />} />
              <Route path="tasks" element={<Tasks />} />
            </>
          ) : (
            <>
              <Route index element={<Dashboard />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="shipments" element={<Shipments />} />
              <Route path="reports" element={<Reports />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;