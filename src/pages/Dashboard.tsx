import React from 'react';
import { 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Thermometer,
  Package,
  Users
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const StaffDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Today's Tasks</p>
              <p className="text-3xl font-bold text-gray-800">8</p>
            </div>
            <Calendar className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-3xl font-bold text-green-600">5</p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-3xl font-bold text-orange-600">3</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-orange-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Efficiency</p>
              <p className="text-3xl font-bold text-purple-600">92%</p>
            </div>
            <TrendingUp className="h-12 w-12 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {[
              { time: '09:00 AM', location: 'Green Valley Apartments', type: 'Routine Check', status: 'completed' },
              { time: '11:30 AM', location: 'Eco Gardens Complex', type: 'Waste Collection', status: 'completed' },
              { time: '02:00 PM', location: 'Sunrise Residency', type: 'Maintenance', status: 'pending' },
              { time: '04:30 PM', location: 'Nature\'s Nest Villa', type: 'Routine Check', status: 'pending' },
            ].map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{task.location}</p>
                  <p className="text-sm text-gray-600">{task.type} • {task.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  task.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Service Notes</h3>
          <div className="space-y-3">
            {[
              { message: 'High temperature at Green Valley - adjusted ventilation', severity: 'medium', time: '2 hours ago' },
              { message: 'Villa customer satisfied with compost quality', severity: 'low', time: '4 hours ago' },
              { message: 'Maintenance due for Composter #EC-003', severity: 'low', time: '1 day ago' },
            ].map((note, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  note.severity === 'high' ? 'bg-red-500' :
                  note.severity === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{note.message}</p>
                  <p className="text-xs text-gray-500">{note.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ManagerDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Composters</p>
              <p className="text-3xl font-bold text-gray-800">24</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Staff Online</p>
              <p className="text-3xl font-bold text-blue-600">12</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Special Projects</p>
              <p className="text-3xl font-bold text-orange-600">3</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Monthly Efficiency</p>
              <p className="text-3xl font-bold text-purple-600">94%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Composter Performance</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Avg Temperature', value: '45°C', icon: Thermometer, color: 'text-red-500' },
              { label: 'Total Waste', value: '8,080 kg', icon: Package, color: 'text-blue-500' },
              { label: 'Compost Generated', value: '2,700 kg', icon: Package, color: 'text-green-500' },
              { label: 'Villas Served', value: '15', icon: CheckCircle, color: 'text-purple-500' },
              { label: 'Apartments', value: '45', icon: CheckCircle, color: 'text-blue-500' },
              { label: 'Commercial', value: '8', icon: CheckCircle, color: 'text-orange-500' },
            ].map((metric, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <metric.icon className={`h-8 w-8 mx-auto mb-2 ${metric.color}`} />
                <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[
              { activity: 'New composter installed at Tech Park', time: '2 hours ago', type: 'installation' },
              { activity: 'Maintenance completed at Green Valley', time: '4 hours ago', type: 'maintenance' },
              { activity: 'Customer complaint resolved', time: '6 hours ago', type: 'support' },
              { activity: 'Staff training session conducted', time: '1 day ago', type: 'training' },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  item.type === 'installation' ? 'bg-green-500' :
                  item.type === 'maintenance' ? 'bg-blue-500' :
                  item.type === 'support' ? 'bg-orange-500' : 'bg-purple-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{item.activity}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">
          {user?.role === 'staff' ? 'Your daily overview and tasks' : 'System overview and management'}
        </p>
      </div>

      {user?.role === 'staff' ? <StaffDashboard /> : <ManagerDashboard />}
    </div>
  );
};

export default Dashboard;