import React, { useState } from 'react';
import { Recycle, Search, Filter, Plus, MapPin, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

const Composters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const composters = [
    {
      id: 'GV-001',
      qrCode: 'GV-001',
      type: "O'Joy",
      location: 'Green Valley Apartments',
      locationType: 'apartment',
      customerName: 'Green Valley Society',
      address: '123 Green Valley Road, Sector 15',
      manufacturingDate: '2023-03-15',
      installationDate: '2023-04-01',
      nextServiceDate: '2024-01-20',
      status: 'active',
      currentTemp: 45,
      lastService: '2024-01-15',
      totalWasteProcessed: 1250.5,
      compostGenerated: 425.2,
      maintenanceCount: 3,
      alerts: 0,
      compostCategory: 'wet',
      specialProject: false
    },
    {
      id: 'EG-003',
      qrCode: 'EG-003',
      type: 'Aaditi',
      location: 'Eco Gardens Complex',
      locationType: 'apartment',
      customerName: 'Eco Gardens Residents',
      address: '456 Eco Gardens Lane, Sector 22',
      manufacturingDate: '2023-05-20',
      installationDate: '2023-06-05',
      nextServiceDate: '2024-01-18',
      status: 'active',
      currentTemp: 52,
      lastService: '2024-01-14',
      totalWasteProcessed: 980.3,
      compostGenerated: 315.8,
      maintenanceCount: 2,
      alerts: 1,
      compostCategory: 'garden',
      specialProject: false
    },
    {
      id: 'SR-002',
      qrCode: 'SR-002',
      type: 'Ishta',
      location: 'Sunrise Residency',
      locationType: 'apartment',
      customerName: 'Sunrise Housing Society',
      address: '789 Sunrise Avenue, Sector 8',
      manufacturingDate: '2023-02-10',
      installationDate: '2023-02-25',
      nextServiceDate: '2024-01-22',
      status: 'maintenance',
      currentTemp: null,
      lastService: '2024-01-10',
      totalWasteProcessed: 1450.8,
      compostGenerated: 498.3,
      maintenanceCount: 5,
      alerts: 2,
      compostCategory: 'wet',
      specialProject: false
    },
    {
      id: 'NN-005',
      qrCode: 'NN-005',
      type: "O'Joy",
      location: "Nature's Nest Villa",
      locationType: 'villa',
      customerName: "Mr. Rajesh Sharma",
      address: "321 Nature's Nest Drive, Sector 12",
      manufacturingDate: '2023-07-12',
      installationDate: '2023-07-28',
      nextServiceDate: '2024-01-25',
      status: 'active',
      currentTemp: 48,
      lastService: '2024-01-12',
      totalWasteProcessed: 750.2,
      compostGenerated: 245.1,
      maintenanceCount: 1,
      alerts: 0,
      compostCategory: 'garden',
      specialProject: false
    },
    {
      id: 'SP-001',
      qrCode: 'SP-001',
      type: 'Aaditi',
      location: 'City Mall Food Court',
      locationType: 'commercial',
      customerName: 'City Mall Management',
      address: '100 Commercial Street, City Center',
      manufacturingDate: '2023-09-15',
      installationDate: '2023-10-01',
      nextServiceDate: '2024-01-30',
      status: 'active',
      currentTemp: 55,
      lastService: '2024-01-16',
      totalWasteProcessed: 2100.5,
      compostGenerated: 680.2,
      maintenanceCount: 2,
      alerts: 0,
      compostCategory: 'wet',
      specialProject: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "O'Joy":
        return 'bg-blue-100 text-blue-800';
      case 'Aaditi':
        return 'bg-purple-100 text-purple-800';
      case 'Ishta':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

  const getLocationTypeColor = (type: string) => {
    switch (type) {
      case 'apartment':
        return 'bg-blue-100 text-blue-800';
      case 'villa':
        return 'bg-purple-100 text-purple-800';
      case 'commercial':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredComposters = composters.filter(composter => {
    const matchesSearch = composter.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         composter.qrCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         composter.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || composter.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || composter.compostCategory === filterCategory;
    return matchesSearch && matchesFilter && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Composter Management</h1>
          <p className="text-gray-600">Monitor and manage all composters in the network</p>
        </div>
        <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          <Plus className="h-5 w-5" />
          <span>Add Composter</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Composters</p>
              <p className="text-3xl font-bold text-gray-800">{composters.length}</p>
            </div>
            <Recycle className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active</p>
              <p className="text-3xl font-bold text-green-600">
                {composters.filter(c => c.status === 'active').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Villas</p>
              <p className="text-3xl font-bold text-purple-600">
                {composters.filter(c => c.locationType === 'villa').length}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Special Projects</p>
              <p className="text-3xl font-bold text-orange-600">
                {composters.filter(c => c.specialProject).length}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Under Maintenance</p>
              <p className="text-3xl font-bold text-red-600">
                {composters.filter(c => c.status === 'maintenance').length}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
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
            placeholder="Search composters..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="maintenance">Maintenance</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="wet">Wet Waste</option>
          <option value="garden">Garden Waste</option>
        </select>
      </div>

      {/* Composters Grid */}
      <div className="grid gap-6">
        {filteredComposters.map((composter) => (
          <div key={composter.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{composter.location}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(composter.type)}`}>
                    {composter.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLocationTypeColor(composter.locationType)}`}>
                    {composter.locationType}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(composter.compostCategory)}`}>
                    {composter.compostCategory} waste
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(composter.status)}`}>
                    {composter.status}
                  </span>
                  {composter.specialProject && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                      Special Project
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-1">{composter.customerName}</p>
                <div className="flex items-center space-x-2 text-gray-500 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{composter.address}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>QR: {composter.qrCode}</span>
                  <span>•</span>
                  <span>Installed: {format(new Date(composter.installationDate), 'MMM d, yyyy')}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="bg-gray-50 px-3 py-2 rounded-lg">
                  <p className="text-sm text-gray-600">Current Temp</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {composter.currentTemp ? `${composter.currentTemp}°C` : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Waste Processed</p>
                <p className="font-bold text-blue-600">{composter.totalWasteProcessed} kg</p>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Compost Generated</p>
                <p className="font-bold text-green-600">{composter.compostGenerated} kg</p>
              </div>
              
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Maintenance Count</p>
                <p className="font-bold text-purple-600">{composter.maintenanceCount}</p>
              </div>
              
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Service Alerts</p>
                <p className="font-bold text-orange-600">{composter.alerts}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>Next Service: {format(new Date(composter.nextServiceDate), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Schedule Service
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Composters;