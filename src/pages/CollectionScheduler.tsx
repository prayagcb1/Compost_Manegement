import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Building2,
  MapPin,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Play,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, isSameDay } from 'date-fns';

interface CollectionSchedule {
  id: string;
  buildingId: string;
  buildingName: string;
  address: string;
  date: string;
  timeSlot: string;
  collectionType: 'wet' | 'dry' | 'mixed' | 'all';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  assignedStaff?: string;
  notes?: string;
}

const mockSchedules: CollectionSchedule[] = [
  {
    id: '1',
    buildingId: '1',
    buildingName: 'Riverside Apartments',
    address: '123 River St, Portland, OR 97201',
    date: '2025-01-15',
    timeSlot: '09:00 AM - 10:00 AM',
    collectionType: 'all',
    status: 'scheduled',
    assignedStaff: 'John Smith',
    notes: 'Regular weekly collection'
  },
  {
    id: '2',
    buildingId: '2',
    buildingName: 'Green Valley Community',
    address: '456 Oak Ave, Portland, OR 97203',
    date: '2025-01-15',
    timeSlot: '10:30 AM - 11:30 AM',
    collectionType: 'wet',
    status: 'scheduled',
    assignedStaff: 'Sarah Johnson'
  },
  {
    id: '3',
    buildingId: '3',
    buildingName: 'Urban Heights',
    address: '789 Pine St, Portland, OR 97205',
    date: '2025-01-15',
    timeSlot: '02:00 PM - 03:00 PM',
    collectionType: 'dry',
    status: 'scheduled',
    assignedStaff: 'Mike Chen'
  },
  {
    id: '4',
    buildingId: '4',
    buildingName: 'Sunset Towers',
    address: '321 Sunset Blvd, Portland, OR 97210',
    date: '2025-01-16',
    timeSlot: '09:00 AM - 10:30 AM',
    collectionType: 'all',
    status: 'scheduled',
    assignedStaff: 'John Smith'
  },
  {
    id: '5',
    buildingId: '1',
    buildingName: 'Riverside Apartments',
    address: '123 River St, Portland, OR 97201',
    date: '2025-01-14',
    timeSlot: '09:00 AM - 10:00 AM',
    collectionType: 'wet',
    status: 'completed',
    assignedStaff: 'John Smith'
  },
  {
    id: '6',
    buildingId: '2',
    buildingName: 'Green Valley Community',
    address: '456 Oak Ave, Portland, OR 97203',
    date: '2025-01-14',
    timeSlot: '11:00 AM - 12:00 PM',
    collectionType: 'all',
    status: 'completed',
    assignedStaff: 'Sarah Johnson'
  }
];

const CollectionScheduler = () => {
  const [schedules] = useState<CollectionSchedule[]>(mockSchedules);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCollectionTypeColor = (type: string) => {
    switch (type) {
      case 'wet':
        return 'bg-emerald-100 text-emerald-800';
      case 'dry':
        return 'bg-blue-100 text-blue-800';
      case 'mixed':
        return 'bg-orange-100 text-orange-800';
      case 'all':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = schedule.buildingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         schedule.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || schedule.status === statusFilter;
    const matchesDate = isSameDay(new Date(schedule.date), selectedDate);
    return matchesSearch && matchesStatus && matchesDate;
  });

  const schedulesForWeek = schedules.filter(schedule => {
    const scheduleDate = new Date(schedule.date);
    const weekStart = startOfWeek(selectedDate);
    const weekEnd = endOfWeek(selectedDate);
    return scheduleDate >= weekStart && scheduleDate <= weekEnd;
  });

  const getDaySchedules = (date: Date) => {
    return schedules.filter(schedule => isSameDay(new Date(schedule.date), date));
  };

  const handlePreviousDay = () => {
    setSelectedDate(prev => addDays(prev, -1));
  };

  const handleNextDay = () => {
    setSelectedDate(prev => addDays(prev, 1));
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(selectedDate), i));

  const todaySchedules = schedules.filter(s => isSameDay(new Date(s.date), new Date()));
  const scheduledCount = todaySchedules.filter(s => s.status === 'scheduled').length;
  const completedCount = todaySchedules.filter(s => s.status === 'completed').length;
  const inProgressCount = todaySchedules.filter(s => s.status === 'in-progress').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Waste Collection Scheduler</h1>
          <p className="text-gray-600">Manage and track waste collection schedules across all buildings</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Schedule Collection</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Collections</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{todaySchedules.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{scheduledCount}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{inProgressCount}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Play className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{completedCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePreviousDay}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900">{format(selectedDate, 'MMMM d, yyyy')}</h2>
              <p className="text-sm text-gray-500">{format(selectedDate, 'EEEE')}</p>
            </div>
            <button
              onClick={handleNextDay}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={handleToday}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Today
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search buildings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {filteredSchedules.length > 0 ? (
          <div className="space-y-4">
            {filteredSchedules.map((schedule) => (
              <div
                key={schedule.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Building2 className="h-5 w-5 text-gray-400" />
                      <h3 className="text-lg font-semibold text-gray-900">{schedule.buildingName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(schedule.status)}`}>
                        {schedule.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCollectionTypeColor(schedule.collectionType)}`}>
                        {schedule.collectionType} waste
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{schedule.address}</span>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">{schedule.timeSlot}</span>
                      </div>
                      {schedule.assignedStaff && (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500">Assigned to:</span>
                          <span className="font-medium">{schedule.assignedStaff}</span>
                        </div>
                      )}
                    </div>

                    {schedule.notes && (
                      <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {schedule.notes}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {schedule.status === 'scheduled' && (
                      <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                        <Play className="h-4 w-4" />
                      </button>
                    )}
                    {schedule.status === 'in-progress' && (
                      <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    )}
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No collections scheduled for this date</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Schedule a Collection
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Overview</h3>
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((day, index) => {
            const daySchedules = getDaySchedules(day);
            const isToday = isSameDay(day, new Date());
            const isSelected = isSameDay(day, selectedDate);

            return (
              <div
                key={index}
                onClick={() => setSelectedDate(day)}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-green-500 bg-green-50'
                    : isToday
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center mb-3">
                  <p className="text-xs font-medium text-gray-600 uppercase">{format(day, 'EEE')}</p>
                  <p className={`text-2xl font-bold ${isSelected ? 'text-green-600' : 'text-gray-900'}`}>
                    {format(day, 'd')}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium">{daySchedules.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-blue-600">Scheduled:</span>
                    <span className="font-medium text-blue-600">
                      {daySchedules.filter(s => s.status === 'scheduled').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-600">Done:</span>
                    <span className="font-medium text-green-600">
                      {daySchedules.filter(s => s.status === 'completed').length}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CollectionScheduler;
