import React from 'react';
import { 
  Recycle, 
  Calendar, 
  CheckCircle, 
  TrendingUp,
  Package,
  Thermometer,
  AlertTriangle
} from 'lucide-react';
import { format } from 'date-fns';

const CustomerDashboard = () => {
  const customerData = {
    name: 'Rajesh Sharma',
    location: "Nature's Nest Villa",
    composters: [
      {
        id: 'NN-005',
        type: "O'Joy",
        status: 'active',
        lastService: '2024-01-12',
        nextService: '2024-01-25',
        wasteProcessed: 750.2,
        compostGenerated: 245.1,
        currentTemp: 48
      }
    ],
    monthlyStats: {
      wasteProcessed: 85.5,
      compostGenerated: 28.2,
      efficiency: 33
    },
    recentServices: [
      {
        date: '2024-01-12',
        type: 'Routine Check',
        staff: 'Raj Kumar',
        notes: 'All parameters normal. Excellent compost quality.',
        rating: 5
      },
      {
        date: '2024-01-05',
        type: 'Waste Collection',
        staff: 'Amit Singh',
        notes: 'Regular collection completed.',
        rating: 5
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {customerData.name}</h1>
          <p className="text-gray-600">{customerData.location}</p>
        </div>
        <div className="bg-green-100 px-4 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800">Active Service</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">This Month's Waste</p>
              <p className="text-3xl font-bold text-blue-600">{customerData.monthlyStats.wasteProcessed} kg</p>
            </div>
            <Package className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Compost Generated</p>
              <p className="text-3xl font-bold text-green-600">{customerData.monthlyStats.compostGenerated} kg</p>
            </div>
            <Recycle className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Efficiency</p>
              <p className="text-3xl font-bold text-purple-600">{customerData.monthlyStats.efficiency}%</p>
            </div>
            <TrendingUp className="h-12 w-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Current Temperature</p>
              <p className="text-3xl font-bold text-red-600">{customerData.composters[0].currentTemp}°C</p>
            </div>
            <Thermometer className="h-12 w-12 text-red-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Composter Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Composter</h3>
          {customerData.composters.map((composter) => (
            <div key={composter.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-bold text-gray-800">{composter.type} - {composter.id}</h4>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {composter.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="text-xl font-bold text-red-600">{composter.currentTemp}°C</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Total Waste</p>
                  <p className="font-bold text-blue-600">{composter.wasteProcessed} kg</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Compost Made</p>
                  <p className="font-bold text-green-600">{composter.compostGenerated} kg</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Last Service: {format(new Date(composter.lastService), 'MMM d, yyyy')}</span>
                <span>Next Service: {format(new Date(composter.nextService), 'MMM d, yyyy')}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Service History */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Services</h3>
          <div className="space-y-4">
            {customerData.recentServices.map((service, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-800">{service.type}</p>
                    <p className="text-sm text-gray-600">by {service.staff}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{format(new Date(service.date), 'MMM d, yyyy')}</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${i < service.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{service.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="h-6 w-6 text-blue-500" />
            <div className="text-left">
              <p className="font-medium text-gray-800">Schedule Service</p>
              <p className="text-sm text-gray-600">Request maintenance or pickup</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
            <div className="text-left">
              <p className="font-medium text-gray-800">Report Issue</p>
              <p className="text-sm text-gray-600">Report problems or concerns</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <div className="text-left">
              <p className="font-medium text-gray-800">Rate Service</p>
              <p className="text-sm text-gray-600">Provide feedback</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;