import React, { useState } from 'react';
import { Search, Calendar, MapPin, Thermometer, Package, User, Eye } from 'lucide-react';
import { format } from 'date-fns';

const ServiceLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState<any>(null);

  const serviceLogs = [
    {
      id: '1',
      date: '2024-01-15',
      composerId: 'GV-001',
      location: 'Green Valley Apartments',
      wasteReceived: 25.5,
      wasteCategory: 'wet',
      temperature: 45,
      compostGenerated: 8.2,
      staffName: 'Raj Kumar',
      workType: 'Routine Check',
      customerSatisfaction: '5',
      notes: 'Regular maintenance completed. All parameters within normal range.',
      photos: 3
    },
    {
      id: '2',
      date: '2024-01-14',
      composerId: 'EG-003',
      location: 'Eco Gardens Complex',
      wasteReceived: 18.3,
      wasteCategory: 'garden',
      temperature: 52,
      compostGenerated: 6.1,
      staffName: 'Raj Kumar',
      workType: 'Waste Collection',
      customerSatisfaction: '4',
      notes: 'Temperature slightly elevated. Adjusted ventilation.',
      photos: 2
    },
    {
      id: '3',
      date: '2024-01-13',
      composerId: 'NN-005',
      location: "Nature's Nest Villa",
      wasteReceived: 12.8,
      wasteCategory: 'garden',
      temperature: 48,
      compostGenerated: 4.2,
      staffName: 'Amit Singh',
      workType: 'Maintenance',
      customerSatisfaction: '5',
      notes: 'Villa customer very satisfied with compost quality.',
      photos: 4
    },
    {
      id: '4',
      date: '2024-01-12',
      composerId: 'SR-002',
      location: 'Sunrise Residency',
      wasteReceived: 30.2,
      wasteCategory: 'wet',
      temperature: 47,
      compostGenerated: 10.1,
      staffName: 'Raj Kumar',
      workType: 'Repair',
      customerSatisfaction: '4',
      notes: 'Fixed door mechanism. Customer happy with quick response.',
      photos: 5
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'wet':
        return 'bg-green-100 text-green-800';
      case 'garden':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkTypeColor = (type: string) => {
    switch (type) {
      case 'Routine Check':
        return 'bg-blue-100 text-blue-800';
      case 'Waste Collection':
        return 'bg-green-100 text-green-800';
      case 'Maintenance':
        return 'bg-orange-100 text-orange-800';
      case 'Repair':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = serviceLogs.filter(log =>
    log.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.composerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.staffName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const LogDetailModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">{selectedLog?.location}</h2>
            <button
              onClick={() => setSelectedLog(null)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600">{format(new Date(selectedLog?.date), 'MMMM d, yyyy')}</p>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Composter ID</p>
              <p className="font-bold text-blue-800">{selectedLog?.composerId}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Staff Member</p>
              <p className="font-bold text-green-800">{selectedLog?.staffName}</p>
            </div>
          </div>

          {/* Work Details */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <Package className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Waste Received</p>
              <p className="font-bold text-purple-800">{selectedLog?.wasteReceived} kg</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <Thermometer className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="font-bold text-red-800">{selectedLog?.temperature}°C</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <Package className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Compost Made</p>
              <p className="font-bold text-green-800">{selectedLog?.compostGenerated} kg</p>
            </div>
          </div>

          {/* Work Type & Category */}
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getWorkTypeColor(selectedLog?.workType)}`}>
              {selectedLog?.workType}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedLog?.wasteCategory)}`}>
              {selectedLog?.wasteCategory} waste
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              {selectedLog?.photos} photos
            </span>
          </div>

          {/* Customer Satisfaction */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Customer Satisfaction</p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{'⭐'.repeat(parseInt(selectedLog?.customerSatisfaction || '0'))}</span>
              <span className="font-medium text-blue-800">
                {selectedLog?.customerSatisfaction}/5 Stars
              </span>
            </div>
          </div>

          {/* Notes */}
          {selectedLog?.notes && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Work Notes</p>
              <p className="text-gray-800">{selectedLog.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Service History</h1>
          <p className="text-gray-600">View your completed work reports</p>
        </div>
        <div className="bg-green-100 px-4 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800">{filteredLogs.length} Reports</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by location, composter ID, or staff name..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
        />
      </div>

      {/* Service Logs Grid */}
      <div className="grid gap-4">
        {filteredLogs.map((log) => (
          <div key={log.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{log.location}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getWorkTypeColor(log.workType)}`}>
                    {log.workType}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(log.wasteCategory)}`}>
                    {log.wasteCategory} waste
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(log.date), 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{log.composerId}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{log.staffName}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-2">
                  <span className="text-2xl">{'⭐'.repeat(parseInt(log.customerSatisfaction))}</span>
                </div>
                <p className="text-sm text-gray-500">Customer Rating</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <Package className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                <p className="text-sm text-gray-600">Waste</p>
                <p className="font-bold text-blue-600">{log.wasteReceived} kg</p>
              </div>
              
              <div className="bg-red-50 p-3 rounded-lg text-center">
                <Thermometer className="h-5 w-5 text-red-500 mx-auto mb-1" />
                <p className="text-sm text-gray-600">Temp</p>
                <p className="font-bold text-red-600">{log.temperature}°C</p>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <Package className="h-5 w-5 text-green-500 mx-auto mb-1" />
                <p className="text-sm text-gray-600">Compost</p>
                <p className="font-bold text-green-600">{log.compostGenerated} kg</p>
              </div>
            </div>

            {log.notes && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{log.notes}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{log.photos} photos attached</span>
              </div>
              <button
                onClick={() => setSelectedLog(log)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredLogs.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No service reports found.</p>
          <p className="text-gray-500 text-sm">Submit your first work report to see it here!</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedLog && <LogDetailModal />}
    </div>
  );
};

export default ServiceLogs;