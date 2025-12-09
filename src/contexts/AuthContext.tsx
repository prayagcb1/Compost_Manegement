import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  // Staff
  {
    id: '1',
    name: 'Raj Kumar',
    email: 'raj@stonesoup.com',
    role: 'staff',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    assignedZone: 'North Zone'
  },
  {
    id: '1a',
    name: 'Raj',
    email: 'raj@aaditi.ai',
    role: 'staff',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    assignedZone: 'Central Zone'
  },
  {
    id: '1b',
    name: 'Raj',
    email: 'raj',
    role: 'staff',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    assignedZone: 'Central Zone'
  },
  {
    id: '2',
    name: 'Amit Singh',
    email: 'amit@stonesoup.com',
    role: 'staff',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    assignedZone: 'South Zone'
  },
  // Supervisor
  {
    id: '3',
    name: 'Priya Sharma',
    email: 'priya@stonesoup.com',
    role: 'supervisor',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    assignedZone: 'Central Zone'
  },
  // Central Admin
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@stonesoup.com',
    role: 'central-admin',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  // Customers
  {
    id: '5',
    name: 'Rajesh Sharma',
    email: 'rajesh@gmail.com',
    role: 'customer',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    customerId: 'CUST-001'
  },
  {
    id: '6',
    name: 'Green Valley Society',
    email: 'admin@greenvalley.com',
    role: 'customer',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    customerId: 'CUST-002'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('stonesoup_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - handle multiple login formats
    let foundUser = mockUsers.find(u => u.email === email);
    
    // If not found by email, try to find by name (for simple logins like "raj")
    if (!foundUser && email.toLowerCase() === 'raj') {
      foundUser = mockUsers.find(u => u.name.toLowerCase() === 'raj' || u.email === 'raj@aaditi.ai');
    }
    
    // Handle admin login
    if (!foundUser && email === 'admin@stonesoup.com' && password === 'admin123') {
      foundUser = mockUsers.find(u => u.role === 'central-admin');
    }
    
    // Handle customer login
    if (!foundUser && email === 'customer@example.com' && password === 'customer123') {
      foundUser = mockUsers.find(u => u.role === 'customer');
    }
    
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('stonesoup_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    // Handle special admin/customer passwords
    if (foundUser && ((email === 'admin@stonesoup.com' && password === 'admin123') || 
                      (email === 'customer@example.com' && password === 'customer123'))) {
      setUser(foundUser);
      localStorage.setItem('stonesoup_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stonesoup_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}