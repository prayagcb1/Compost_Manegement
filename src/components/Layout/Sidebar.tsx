import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Calendar,
  ClipboardList,
  Package,
  BarChart3,
  Settings,
  Users,
  Recycle,
  Wrench,
  BookOpen,
  Bell,
  User,
  CheckCircle,
  FileText,
  FormInput,
  Send,
  Building2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  const staffNavItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
  ];

  const supervisorNavItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/buildings', icon: Building2, label: 'Buildings' },
    { to: '/collection-scheduler', icon: Calendar, label: 'Collection Scheduler' },
    { to: '/supervisor-form', icon: FormInput, label: 'Daily Report' },
    { to: '/tasks', icon: ClipboardList, label: 'Task Management' },
    { to: '/staff', icon: Users, label: 'Staff Management' },
  ];

  const centralAdminNavItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/composters', icon: Recycle, label: 'Composters' },
    { to: '/buildings', icon: Building2, label: 'Buildings' },
    { to: '/collection-scheduler', icon: Calendar, label: 'Collection Scheduler' },
    { to: '/shredders', icon: Wrench, label: 'Shredders' },
    { to: '/tasks', icon: ClipboardList, label: 'Task Management' },
    { to: '/staff', icon: Users, label: 'Staff Management' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const customerNavItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/my-composters', icon: Recycle, label: 'My Composters' },
    { to: '/service-history', icon: FileText, label: 'Service History' },
    { to: '/harvest-tracking', icon: CheckCircle, label: 'Harvest Tracking' },
    { to: '/support', icon: Bell, label: 'Support' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  const getNavItems = () => {
    switch (user?.role) {
      case 'staff':
        return staffNavItems;
      case 'supervisor':
        return supervisorNavItems;
      case 'central-admin':
        return centralAdminNavItems;
      case 'customer':
        return customerNavItems;
      default:
        return [];
    }
  };

  const getRoleTitle = () => {
    switch (user?.role) {
      case 'staff':
        return 'Staff Portal';
      case 'supervisor':
        return 'Supervisor Portal';
      case 'central-admin':
        return 'Central Admin';
      case 'customer':
        return 'Customer Portal';
      default:
        return 'Portal';
    }
  };

  const navItems = getNavItems();

  return (
    <div className="bg-green-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <div className="flex items-center space-x-2">
          <Recycle className="h-8 w-8 text-green-400" />
          <div>
            <h1 className="text-xl font-bold">StoneSoup</h1>
            <p className="text-green-300 text-sm">{getRoleTitle()}</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-green-800 text-green-100'
                  : 'text-green-200 hover:bg-green-800 hover:text-green-100'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;