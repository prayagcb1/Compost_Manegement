import React, { useState } from 'react';
import { Bell, AlertTriangle, Thermometer, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const alerts = [
    {
      id: '1',
      deviceId: 'GV-001',
      location: 'Green Valley Apartments',
      type: 'temperature',
      severity: 'high',
      message: 'Temperature exceeds safe threshold (65°C)',
      currentValue: '65°C',
      threshold: '60°C',
      timestamp: '2024-01-16T14:30:00',
      resolved: false,
      resolvedBy: null,
      resolvedAt: null,
      actionTaken: null
    },
    {
      id: '2',
      deviceId: 'SR-002',
      location: 'Sunrise Residency',
      type: 'maintenance',
      severity: 'medium',
      message: 'Scheduled maintenance overdue',
      currentValue: '5 days overdue',
      threshold: 'On schedule',
      timestamp: '2024-01-16T12:15:00',
      resolved: false,
      resolvedBy: null,
      resolvedAt: null,
      actionTaken: null
    },
    {
      id: '3',
      deviceId: 'NN-005',
      location: "Nature's Nest Villa",
      type: 'humidity',
      severity: 'low',
      message: 'Humidity levels below optimal range',
      currentValue: '45%',
      threshold: '50%',
      timestamp: '2024-01-16T10:45:00',
      resolved: true,
      resolvedBy: 'Raj Kumar',
      resolvedAt: '2024-01-16T16:20:00',
      actionTaken: 'Added water to increase moisture content'
    },
    {
      id: '4',
      deviceId: 'EG-003',
      location: 'Eco Gardens Complex',
      type: 'temperature',
      severity: 'medium',
      message: 'Temperature slightly elevated',
      currentValue: '58°C',
      threshold: '55°C',
      timestamp: '2024-01-16T09:20:00',
      resolved: true,
      resolvedBy: 'Raj Kumar',
      resolvedAt: '2024-01-16T11:30:00',
      actionTaken: 'Adjusted ventilation settings'
    },
    {
      id: '5',
      deviceId: 'SP-001',
      location: 'City Mall Food Court',
      type: 'capacity',
      severity: 'high',
      message: 'Composter nearing full capacity',
      currentValue: '95%',
      threshold: '80%',
      timestamp: '2024-01-15T18:30:00',
      resolved: false,
      resolvedBy: null,
      resolvedAt: null,
      actionTaken: null
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'temperature':
        return <Thermometer className="h-5 w-5 text-red-500" />;
      case 'maintenance':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'humidity':
        return <Thermometer className="h-5 w-5 text-blue-500" />;
      case 'capacity':
        return <AlertTriangle className="h-5 w-5 text-purple-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'temperature':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800';
      case 'humidity':
        return 'bg-blue-100 text-blue-800';
      case 'capacity':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesType = filterType === 'all' || alert.type === filterType;
    return matchesSearch && matchesSeverity && matchesType;
  });

  const activeAlerts = alerts.filter(alert => !alert.resolved);
  const resolvedAlerts = alerts.filter(alert => alert.resolved);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">System Alerts</h1>
          <p className="text-gray-600">Monitor and manage system alerts and notifications</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-red-500" />
              <span className="font-medium text-gray-800">{activeAlerts.length} Active Alerts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Alerts</p>
              <p className="text-3xl font-bold text-gray-800">{alerts.length}</p>
            </div>
            <Bell className="h-12 w-12 text-gray-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">High Priority</p>
              <p className="text-3xl font-bold text-red-600">
                {alerts.filter(a => a.severity === 'high' && !a.resolved).length}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active</p>
              <p className="text-3xl font-bold text-orange-600">{activeAlerts.length}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Bell className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Resolved Today</p>
              <p className="text-3xl font-bold text-green-600">
                {resolvedAlerts.filter(a => 
                  new Date(a.resolvedAt || '').toDateString() === new Date().toDateString()
                ).length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Bell className="h-6 w-6 text-green-600" />
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
            placeholder="Search alerts..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Severity</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="temperature">Temperature</option>
          <option value="maintenance">Maintenance</option>
          <option value="humidity">Humidity</option>
          <option value="capacity">Capacity</option>
        </select>
      </div>

      {/* Alerts List */}
      <div className="grid gap-4">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className={`bg-white rounded-xl shadow-sm border-l-4 p-6 ${
            alert.severity === 'high' ? 'border-l-red-500' :
            alert.severity === 'medium' ? 'border-l-orange-500' : 'border-l-yellow-500'
          } ${alert.resolved ? 'opacity-75' : ''}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getTypeIcon(alert.type)}
                  <h3 className="text-lg font-bold text-gray-800">{alert.location}</h3>
                  <span className="text-sm text-gray-600">({alert.deviceId})</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(alert.type)}`}>
                    {alert.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(alert.severity)}`}>
                    {alert.severity} priority
                  </span>
                  {alert.resolved && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Resolved
                    </span>
                  )}
                </div>
                
                <p className="text-gray-700 mb-3">{alert.message}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Current Value</p>
                    <p className="font-bold text-gray-800">{alert.currentValue}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Threshold</p>
                    <p className="font-bold text-gray-800">{alert.threshold}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Triggered</p>
                    <p className="font-bold text-gray-800">
                      {format(new Date(alert.timestamp), 'MMM d, HH:mm')}
                    </p>
                  </div>
                </div>

                {alert.resolved && (
                  <div className="bg-green-50 p-3 rounded-lg mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-green-800">Resolution Details</p>
                      <span className="text-xs text-green-600">
                        Resolved by {alert.resolvedBy} on {format(new Date(alert.resolvedAt || ''), 'MMM d, HH:mm')}
                      </span>
                    </div>
                    <p className="text-sm text-green-700">{alert.actionTaken}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Alert ID: {alert.id} • Device: {alert.deviceId}
              </div>
              <div className="flex space-x-2">
                {!alert.resolved && (
                  <>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Acknowledge
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Mark Resolved
                    </button>
                  </>
                )}
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No alerts found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Alerts;