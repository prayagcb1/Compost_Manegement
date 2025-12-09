import React from 'react';
import { Recycle, Thermometer, Calendar, TrendingUp, Package } from 'lucide-react';
import { format } from 'date-fns';

const MyComposters = () => {
  const composters = [
    {
      id: 'NN-005',
      type: "O'Joy",
      qrCode: 'NN-005',
      status: 'active',
      installationDate: '2023-07-28',
      lastService: '2024-01-12',
      nextService: '2024-01-25',
      currentTemp: 48,
      totalWasteProcessed: 750.2,
      compostGenerated: 245.1,
      efficiency: 33,
      compostCategory: 'garden',
      monthlyData: [
        { month: 'Oct', waste: 65, compost: 21 },
        { month: 'Nov', waste: 72, compost: 24 },
        { month: 'Dec', waste: 68, compost: 22 },
        { month: 'Jan', waste: 85, compost: 28 }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Composters</h1>
          <p className="text-gray-600">Monitor your composter performance and status</p>
        </div>
      </div>

      {composters.map((composter) => (
        <div key={composter.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-2xl font-bold text-gray-800">{composter.type}</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {composter.type}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {composter.status}
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  {composter.compostCategory} waste
                </span>
              </div>
              <p className="text-gray-600 mb-2">QR Code: {composter.qrCode}</p>
              <p className="text-sm text-gray-500">
                Installed: {format(new Date(composter.installationDate), 'MMMM d, yyyy')}
              </p>
            </div>
            
            <div className="text-right">
              <div className="bg-red-50 px-4 py-3 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Thermometer className="h-5 w-5 text-red-500" />
                  <span className="text-sm text-gray-600">Current Temperature</span>
                </div>
                <p className="text-3xl font-bold text-red-600">{composter.currentTemp}°C</p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <Package className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Total Waste Processed</p>
              <p className="text-2xl font-bold text-blue-600">{composter.totalWasteProcessed} kg</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <Recycle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Compost Generated</p>
              <p className="text-2xl font-bold text-green-600">{composter.compostGenerated} kg</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Efficiency</p>
              <p className="text-2xl font-bold text-purple-600">{composter.efficiency}%</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <Calendar className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Next Service</p>
              <p className="text-lg font-bold text-orange-600">
                {format(new Date(composter.nextService), 'MMM d')}
              </p>
            </div>
          </div>

          {/* Monthly Performance Chart */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Monthly Performance</h4>
            <div className="grid grid-cols-4 gap-4">
              {composter.monthlyData.map((data, index) => (
                <div key={index} className="text-center">
                  <p className="text-sm font-medium text-gray-600 mb-2">{data.month}</p>
                  <div className="space-y-2">
                    <div className="bg-blue-100 p-2 rounded">
                      <p className="text-xs text-gray-600">Waste</p>
                      <p className="font-bold text-blue-600">{data.waste}kg</p>
                    </div>
                    <div className="bg-green-100 p-2 rounded">
                      <p className="text-xs text-gray-600">Compost</p>
                      <p className="font-bold text-green-600">{data.compost}kg</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Last Service</h4>
              <p className="text-gray-600">{format(new Date(composter.lastService), 'MMMM d, yyyy')}</p>
              <p className="text-sm text-gray-500">Routine maintenance completed</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Next Scheduled Service</h4>
              <p className="text-gray-600">{format(new Date(composter.nextService), 'MMMM d, yyyy')}</p>
              <p className="text-sm text-gray-500">Routine check and maintenance</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6 border-t border-gray-200 mt-6">
            <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              Schedule Service
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
              Report Issue
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
              Download Report
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyComposters;