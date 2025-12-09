export interface User {
  id: string;
  name: string;
  email: string;
  role: 'staff' | 'supervisor' | 'central-admin' | 'customer';
  avatar?: string;
  customerId?: string; // For customer users
  assignedZone?: string; // For staff/supervisor
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  locationType: 'apartment' | 'villa' | 'commercial';
  composters: string[]; // Array of composter IDs
  joinDate: string;
  status: 'active' | 'inactive';
  specialProject: boolean;
}

export interface Composter {
  id: string;
  qrCode: string;
  type: 'O\'Joy' | 'Aaditi' | 'Ishta';
  location: string;
  locationType: 'apartment' | 'villa' | 'commercial';
  customerName: string;
  customerId: string;
  manufacturingDate: string;
  maintenanceHistory: MaintenanceRecord[];
  nextServiceDate: string;
  status: 'active' | 'maintenance' | 'inactive';
  compostCategory: 'wet' | 'garden';
  specialProject: boolean;
}

export interface Shredder {
  id: string;
  manufacturingDate: string;
  maintenanceHistory: MaintenanceRecord[];
  nextServiceDate: string;
  status: 'active' | 'maintenance' | 'inactive';
  problemsDetected: ProblemRecord[];
}

export interface ProblemRecord {
  date: string;
  problem: string;
  solution: string;
  status: 'pending' | 'in-progress' | 'resolved';
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  type: 'routine' | 'repair' | 'parts_replacement';
  description: string;
  technician: string;
  cost?: number;
}

export interface ServiceLog {
  id: string;
  composerId: string;
  staffId: string;
  customerId: string;
  date: string;
  wasteReceived: number;
  wasteCategory: 'wet' | 'garden';
  harvestingDate?: string;
  compostGenerated?: number;
  harvestUsage: 'inhouse' | 'farmer' | 'buyer';
  temperature?: number;
  smell: 'normal' | 'mild' | 'strong';
  leachate: 'none' | 'minimal' | 'moderate' | 'excessive';
  bugs: 'none' | 'few' | 'moderate' | 'many';
  photos: string[];
  notes: string;
}

export interface Alert {
  id: string;
  deviceId: string;
  type: 'temperature' | 'humidity' | 'maintenance' | 'capacity';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  composerId?: string;
  customerId?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  createdBy: string;
  createdAt: string;
}