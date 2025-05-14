
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Home from './Home';
import RequestAdvance from './RequestAdvance';
import Repayments from './Repayments';
import Savings from './Savings';
import Wallet from './Wallet';
import Profile from './Profile';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home as HomeIcon, 
  Wallet as WalletIcon, 
  CreditCard, 
  RefreshCw, 
  PiggyBank,
  User 
} from 'lucide-react';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  
  const navItems = [
    { icon: HomeIcon, label: 'Dashboard', path: '/dashboard/employee' },
    { icon: CreditCard, label: 'Request Advance', path: '/dashboard/employee/request-advance' },
    { icon: RefreshCw, label: 'Repayments', path: '/dashboard/employee/repayments' },
    { icon: PiggyBank, label: 'Savings', path: '/dashboard/employee/savings' },
    { icon: WalletIcon, label: 'Wallet', path: '/dashboard/employee/wallet' },
    { icon: User, label: 'Profile', path: '/dashboard/employee/profile' },
  ];

  return (
    <DashboardLayout 
      navItems={navItems} 
      userType="Employee"
      userName={user?.name || 'Employee'}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/request-advance" element={<RequestAdvance />} />
        <Route path="/repayments" element={<Repayments />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
