import React, { useState } from 'react';
import { Wrench, Search, Plus, Calendar, AlertTriangle, CheckCircle, Settings, FileText } from 'lucide-react';
import { format } from 'date-fns';

const Shredders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const shredders = [
    {
      id: 'SH-001',
      serialNumber: 'SS-2023-001',
      location: 'Central Processing Unit',
      manufacturingDate: '2023-01-15',
      installationDate: '2023-02-01',
      status: 'active',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      operatingHours: 1250,
      bladesReplaced: 2,
      totalWasteShredded: 5420.5,
      problemsDetected: [
        {
          date: '2024-01-15',
          problem: 'Unusual vibration during operation',
          solution: 'Check blade alignment and tighten mounting bolts',
          status: 'resolved'
        },
        {
          date: '2024-01-10',
          problem: 'Motor overheating',
          solution: 'Clean air vents and replace cooling fan',
          status: 'resolved'
        }
      ],
      maintenanceHistory: [
        { date: '2024-01-10', type: 'routine', description: 'Regular maintenance and blade inspection' },
        { date: '2023-10-15', type: 'parts_replacement', description: 'Blade replacement' },
        { date: '2023-07-20', type: 'routine', description: 'Quarterly maintenance' }
      ]
    },
    {
      id: 'SH-002',
      serialNumber: 'SS-2023-002',
      location: 'Eco Gardens Processing',
      manufacturingDate: '2023-03-20',
      installationDate: '2023-04-05',
      status: 'maintenance',
      lastMaintenance: '2024-01-08',
      nextMaintenance: '2024-01-18',
      operatingHours: 980,
      bladesReplaced: 1,
      totalWasteShredded: 3850.2,
      problemsDetected: [
        {
          date: '2024-01-16',
          problem: 'Reduced shredding efficiency',
          solution: 'Sharpen or replace blades, check motor power',
          status: 'pending'
        },
        {
          date: '2024-01-08',
          problem: 'Motor bearing noise',
          solution: 'Replace motor bearings and lubricate',
          status: 'in-progress'
        }
      ],
      maintenanceHistory: [
        { date: '2024-01-08', type: 'repair', description: 'Motor bearing replacement' },
        { date: '2023-12-10', type: 'parts_replacement', description: 'Blade sharpening' },
        { date: '2023-09-15', type: 'routine', description: 'Quarterly maintenance' }
      ]
    },
    {
      id: 'SH-003',
      serialNumber: 'SS-2023-003',
      location: 'Green Valley Processing',
      manufacturingDate: '2023-05-10',
      installationDate: '2023-05-25',
      status: 'active',
      lastMaintenance: '2024-01-12',
      nextMaintenance: '2024-04-12',
      operatingHours: 750,
      bladesReplaced: 0,
      totalWasteShredded: 2890.8,
      problemsDetected: [
        {
          date: '2024-01-12',
          problem: 'Minor oil leak from gearbox',
          solution: 'Replace gearbox seals and top up oil',
          status: 'resolved'
        }
      ],
      maintenanceHistory: [
        { date: '2024-01-12', type: 'routine', description: 'Regular maintenance and cleaning' },
        { date: '2023-11-20', type: 'routine', description: 'Quarterly maintenance' }
      ]
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

  const getProblemStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMaintenanceTypeColor = (type: string) => {
    switch (type) {
      case 'routine':
        return 'bg-blue-100 text-blue-800';
      case 'repair':
        return 'bg-red-100 text-red-800';
      case 'parts_replacement':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredShredders = shredders.filter(shredder => {
    const matchesSearch = shredder.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shredder.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || shredder.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Shredder Management</h1>
          <p className="text-gray-600">Monitor and maintain waste shredding equipment</p>
        </div>
        <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          <Plus className="h-5 w-5" />
          <span>Add Shredder</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Shredders</p>
              <p className="text-3xl font-bold text-gray-800">{shredders.length}</p>
            </div>
            <Wrench className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active</p>
              <p className="text-3xl font-bold text-green-600">
                {shredders.filter(s => s.status === 'active').length}
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
              <p className="text-gray-600 text-sm">Under Maintenance</p>
              <p className="text-3xl font-bold text-orange-600">
                {shredders.filter(s => s.status === 'maintenance').length}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Settings className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Problems</p>
              <p className="text-3xl font-bold text-red-600">
                {shredders.reduce((sum, s) => sum + s.problemsDetected.filter(p => p.status !== 'resolved').length, 0)}
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
            placeholder="Search shredders..."
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
      </div>

      {/* Shredders Grid */}
      <div className="grid gap-6">
        {filteredShredders.map((shredder) => (
          <div key={shredder.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{shredder.location}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(shredder.status)}`}>
                    {shredder.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">Serial: {shredder.serialNumber}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Manufactured: {format(new Date(shredder.manufacturingDate), 'MMM d, yyyy')}</span>
                  <span>•</span>
                  <span>Installed: {format(new Date(shredder.installationDate), 'MMM d, yyyy')}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="bg-gray-50 px-3 py-2 rounded-lg">
                  <p className="text-sm text-gray-600">Operating Hours</p>
                  <p className="text-2xl font-bold text-gray-800">{shredder.operatingHours}h</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Waste Shredded</p>
                <p className="font-bold text-blue-600">{shredder.totalWasteShredded} kg</p>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Blades Replaced</p>
                <p className="font-bold text-green-600">{shredder.bladesReplaced}</p>
              </div>
              
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Last Maintenance</p>
                <p className="font-bold text-purple-600">{format(new Date(shredder.lastMaintenance), 'MMM d')}</p>
              </div>
              
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Next Maintenance</p>
                <p className="font-bold text-orange-600">{format(new Date(shredder.nextMaintenance), 'MMM d')}</p>
              </div>
            </div>

            {/* Problems Detected Section */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                Recent Problems & Solutions
              </h4>
              <div className="space-y-3">
                {shredder.problemsDetected.slice(0, 2).map((problem, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProblemStatusColor(problem.status)}`}>
                            {problem.status}
                          </span>
                          <span className="text-xs text-gray-500">{format(new Date(problem.date), 'MMM d, yyyy')}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-800 mb-1">Problem: {problem.problem}</p>
                        <p className="text-sm text-gray-600">Solution: {problem.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Maintenance History */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                <FileText className="h-4 w-4 mr-2 text-blue-500" />
                Recent Maintenance History
              </h4>
              <div className="space-y-2">
                {shredder.maintenanceHistory.slice(0, 2).map((maintenance, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMaintenanceTypeColor(maintenance.type)}`}>
                        {maintenance.type.replace('_', ' ')}
                      </span>
                      <span className="text-sm text-gray-700">{maintenance.description}</span>
                    </div>
                    <span className="text-xs text-gray-500">{format(new Date(maintenance.date), 'MMM d, yyyy')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>Next Service: {format(new Date(shredder.nextMaintenance), 'MMM d, yyyy')}</span>
                {new Date(shredder.nextMaintenance) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                  <span className="flex items-center space-x-1 text-orange-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Due Soon</span>
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  View History
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Schedule Maintenance
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shredders;