import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  deliveryType: 'delivery' | 'pickup';
  address?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'userId' | 'createdAt'>) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated database
const STORAGE_KEY = 'burguer_gourmet_users';
const ORDERS_KEY = 'burguer_gourmet_orders';
const SESSION_KEY = 'burguer_gourmet_session';

interface StoredUser extends User {
  password: string;
}

function getStoredUsers(): StoredUser[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function getStoredOrders(): Order[] {
  const data = localStorage.getItem(ORDERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      const userData = JSON.parse(session);
      setUser(userData);
    }
    setOrders(getStoredOrders());
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = getStoredUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = getStoredUsers();
    const exists = users.find((u) => u.email === email);
    
    if (exists) {
      return false;
    }

    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

    const { password: _, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    
    const users = getStoredUsers();
    const index = users.findIndex((u) => u.id === user.id);
    
    if (index !== -1) {
      users[index] = { ...users[index], ...data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    }
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'userId' | 'createdAt'>): string => {
    const orderId = `ORD-${Date.now()}`;
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      userId: user?.id || 'guest',
      createdAt: new Date().toISOString(),
    };

    const allOrders = [...getStoredOrders(), newOrder];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(allOrders));
    setOrders(allOrders);
    
    return orderId;
  };

  const userOrders = orders.filter((o) => o.userId === user?.id);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
        orders: userOrders,
        addOrder,
      }}
    >
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
