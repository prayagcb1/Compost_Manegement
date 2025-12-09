import React, { useState } from 'react';
import { Calendar, MapPin, User, Star, FileText, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';

const ServiceHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const serviceHistory = [
    {
      id: '1',
      date: '2024-01-15',
      type: 'Routine Check',
      staffName: 'Raj Kumar',
      composterQR: 'NN-005',
      wasteProcessed: 12.8,
      compostGenerated: 4.2,
      temperature: 48,
      rating: 5,
      notes: 'Excellent maintenance. All parameters normal. Customer very satisfied with compost quality.',
      photos: 4,
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-01-08',
      type: 'Waste Collection',
      staffName: 'Raj Kumar',
      composterQR: 'NN-005',
      wasteProcessed: 15.2,
      compostGenerated: 5.1,
      temperature: 46,
      rating: 5,
      notes: 'Regular collection completed. Good waste segregation by customer.',
      photos: 2,
      status: 'completed'
    },
    {
      id: '3',
      date: '2024-01-01',
      type: 'Maintenance',
      staffName: 'Amit Singh',
      composterQR: 'NN-005',
      wasteProcessed: 0,
      compostGenerated: 0,
      temperature: 0,
      rating: 4,
      notes: 'Quarterly maintenance completed. Cleaned filters and checked all components.',
      photos: 3,
      status: 'completed'
    },
    {
      id: '4',
      date: '2023-12-25',
      type: 'Installation',
      staffName: 'Raj Kumar',
      composterQR: 'NN-005',
      wasteProcessed: 0,
      compostGenerated: 0,
      temperature: 0,
      rating: 5,
      notes: 'Initial installation completed successfully. Customer training provided.',
      photos: 6,
      status: 'completed'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Routine Check':
        return 'bg-blue-100 text-blue-800';
      case 'Waste Collection':
        return 'bg-green-100 text-green-800';
      case 'Maintenance':
        return 'bg-orange-100 text-orange-800';
      case 'Installation':
        return 'bg-purple-100 text-purple-800';
      case 'Repair':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredHistory = serviceHistory.filter(service => {
    const matchesSearch = service.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || service.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Service History</h1>
          <p className="text-gray-600">Complete history of all services performed</p>
        </div>
        <div className="bg-blue-100 px-4 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-800">{filteredHistory.length} Services</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 text-sm">Total Services</p>
            <p className="text-3xl font-bold text-blue-600">{serviceHistory.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 text-sm">Average Rating</p>
            <p className="text-3xl font-bold text-yellow-600">
              {(serviceHistory.reduce((sum, s) => sum + s.rating, 0) / serviceHistory.length).toFixed(1)}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 text-sm">Total Waste Processed</p>
            <p className="text-3xl font-bold text-green-600">
              {serviceHistory.reduce((sum, s) => sum + s.wasteProcessed, 0).toFixed(1)} kg
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 text-sm">Compost Generated</p>
            <p className="text-3xl font-bold text-purple-600">
              {serviceHistory.reduce((sum, s) => sum + s.compostGenerated, 0).toFixed(1)} kg
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search services..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Services</option>
          <option value="Routine Check">Routine Check</option>
          <option value="Waste Collection">Waste Collection</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Installation">Installation</option>
          <option value="Repair">Repair</option>
        </select>
      </div>

      {/* Service History List */}
      <div className="space-y-4">
        {filteredHistory.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{service.type}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(service.type)}`}>
                    {service.type}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(service.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{service.staffName}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{service.composterQR}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < service.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500">{service.rating}/5 Rating</p>
              </div>
            </div>

            {(service.wasteProcessed > 0 || service.compostGenerated > 0) && (
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Waste Processed</p>
                  <p className="font-bold text-green-600">{service.wasteProcessed} kg</p>
                </div>
                
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Compost Generated</p>
                  <p className="font-bold text-purple-600">{service.compostGenerated} kg</p>
                </div>
                
                {service.temperature > 0 && (
                  <div className="bg-red-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Temperature</p>
                    <p className="font-bold text-red-600">{service.temperature}°C</p>
                  </div>
                )}
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Service Notes:</p>
              <p className="text-gray-700">{service.notes}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{service.photos} photos taken</span>
                <span>Status: {service.status}</span>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No service history found.</p>
          <p className="text-gray-500 text-sm">Services will appear here once they are completed.</p>
        </div>
      )}
    </div>
  );
};

export default ServiceHistory;