import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { 
  LayoutDashboard, 
  Package, 
  TruckIcon, 
  BarChart2, 
  LogOut, 
  Bell,
  PackageCheck,
  PackagePlus,
  Map,
  ClipboardList,
  Boxes
} from 'lucide-react';

const clientNavItems = [
  { path: '/', icon: LayoutDashboard, label: '概要' },
  { path: '/inventory', icon: Package, label: '在庫管理' },
  { path: '/shipments', icon: TruckIcon, label: '出荷管理' },
  { path: '/reports', icon: BarChart2, label: 'レポート' },
];

const warehouseNavItems = [
  { path: '/', icon: LayoutDashboard, label: '概要' },
  { path: '/inbound', icon: PackagePlus, label: '入庫管理' },
  { path: '/outbound', icon: PackageCheck, label: '出庫管理' },
  { path: '/locations', icon: Map, label: 'ロケーション' },
  { path: '/inventory', icon: Boxes, label: '在庫管理' },
  { path: '/picking', icon: ClipboardList, label: 'ピッキング' },
  { path: '/tasks', icon: Package, label: '作業一覧' },
];

const Layout = () => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navItems = user?.role === 'warehouse' ? warehouseNavItems : clientNavItems;

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">
            {user?.role === 'warehouse' ? 'WMS 倉庫管理' : 'WMS クライアント'}
          </h1>
        </div>
        <nav className="p-4">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center px-4 py-3 mb-2 rounded-lg ${
                location.pathname === path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200">
          <div className="flex items-center justify-end h-full px-6">
            <button className="p-2 mr-4 text-gray-400 hover:text-gray-600">
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={logout}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <span className="mr-2">{user?.name}</span>
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;