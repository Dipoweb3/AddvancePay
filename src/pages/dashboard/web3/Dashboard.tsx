
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Web3Home from './Home';
import Deposit from './Deposit';
import Positions from './Positions';
import Analytics from './Analytics';
import Settings from './Settings';
import { 
  Home, 
  PiggyBank, 
  BarChart,
  Wallet,
  Settings as SettingsIcon
} from 'lucide-react';

const Web3Dashboard = () => {
  const { user } = useAuth();
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard/web3' },
    { icon: PiggyBank, label: 'Deposit to Pools', path: '/dashboard/web3/deposit' },
    { icon: Wallet, label: 'My Positions', path: '/dashboard/web3/positions' },
    { icon: BarChart, label: 'Analytics', path: '/dashboard/web3/analytics' },
    { icon: SettingsIcon, label: 'Wallet Settings', path: '/dashboard/web3/settings' },
  ];

  return (
    <DashboardLayout 
      navItems={navItems} 
      userType="Web3 User" 
      userName={user?.name || 'Web3 User'}
    >
      <Routes>
        <Route path="/" element={<Web3Home />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/positions" element={<Positions />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Web3Dashboard;
