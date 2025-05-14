
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Home from './Home';
import Employees from './Employees';
import Payroll from './Payroll';
import Repayments from './Repayments';
import Settings from './Settings';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home as HomeIcon, 
  Users, 
  CreditCard, 
  RefreshCw, 
  Settings as SettingsIcon 
} from 'lucide-react';

const EmployerDashboard = () => {
  const { user } = useAuth();
  
  const navItems = [
    { icon: HomeIcon, label: 'Dashboard', path: '/dashboard/employer' },
    { icon: Users, label: 'Employees', path: '/dashboard/employer/employees' },
    { icon: CreditCard, label: 'Payroll', path: '/dashboard/employer/payroll' },
    { icon: RefreshCw, label: 'Repayments', path: '/dashboard/employer/repayments' },
    { icon: SettingsIcon, label: 'Settings', path: '/dashboard/employer/settings' },
  ];

  return (
    <DashboardLayout 
      navItems={navItems} 
      userType="Employer"
      userName={user?.name || 'Employer'}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/repayments" element={<Repayments />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
};

export default EmployerDashboard;
