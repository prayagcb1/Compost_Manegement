import React, { useState, useEffect } from 'react';
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
  Search,
  X
} from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface CollectionSchedule {
  id: string;
  building_id: string;
  date: string;
  time_slot: string;
  collection_type: 'wet' | 'dry' | 'mixed' | 'all';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  assigned_staff_id: string | null;
  notes: string | null;
  building?: {
    name: string;
    address: string;
  };
  assigned_staff?: {
    full_name: string;
  };
}

interface Building {
  id: string;
  name: string;
  address: string;
}

interface Staff {
  id: string;
  full_name: string;
}

const CollectionScheduler = () => {
  const [schedules, setSchedules] = useState<CollectionSchedule[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newSchedule, setNewSchedule] = useState({
    building_id: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time_slot: '09:00 AM - 10:00 AM',
    collection_type: 'all' as 'wet' | 'dry' | 'mixed' | 'all',
    assigned_staff_id: '',
    notes: ''
  });

  useEffect(() => {
    fetchSchedules();
    fetchBuildings();
    fetchStaff();
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('collection_schedules')
        .select(`
          *,
          building:buildings (name, address),
          assigned_staff:profiles (full_name)
        `)
        .order('date', { ascending: true });

      if (error) throw error;
      setSchedules(data || []);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      toast.error('Failed to load schedules');
    } finally {
      setLoading(false);
    }
  };

  const fetchBuildings = async () => {
    try {
      const { data, error } = await supabase
        .from('buildings')
        .select('id, name, address')
        .order('name');

      if (error) throw error;
      setBuildings(data || []);
    } catch (error) {
      console.error('Error fetching buildings:', error);
    }
  };

  const fetchStaff = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('role', ['staff', 'supervisor'])
        .order('full_name');

      if (error) throw error;
      setStaff(data || []);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const handleAddSchedule = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newSchedule.building_id) {
      toast.error('Please select a building');
      return;
    }

    try {
      const { error } = await supabase.from('collection_schedules').insert({
        building_id: newSchedule.building_id,
        date: newSchedule.date,
        time_slot: newSchedule.time_slot,
        collection_type: newSchedule.collection_type,
        assigned_staff_id: newSchedule.assigned_staff_id || null,
        notes: newSchedule.notes || null,
        status: 'scheduled'
      });

      if (error) throw error;

      toast.success('Collection scheduled successfully');
      setShowAddModal(false);
      setNewSchedule({
        building_id: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        time_slot: '09:00 AM - 10:00 AM',
        collection_type: 'all',
        assigned_staff_id: '',
        notes: ''
      });
      fetchSchedules();
    } catch (error) {
      console.error('Error adding schedule:', error);
      toast.error('Failed to schedule collection');
    }
  };

  const handleUpdateStatus = async (scheduleId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('collection_schedules')
        .update({ status: newStatus })
        .eq('id', scheduleId);

      if (error) throw error;

      toast.success('Status updated successfully');
      fetchSchedules();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    if (!confirm('Are you sure you want to delete this schedule?')) return;

    try {
      const { error } = await supabase
        .from('collection_schedules')
        .delete()
        .eq('id', scheduleId);

      if (error) throw error;

      toast.success('Schedule deleted successfully');
      fetchSchedules();
    } catch (error) {
      console.error('Error deleting schedule:', error);
      toast.error('Failed to delete schedule');
    }
  };

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
    const buildingName = schedule.building?.name || '';
    const address = schedule.building?.address || '';
    const matchesSearch = buildingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         address.toLowerCase().includes(searchTerm.toLowerCase());
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading schedules...</p>
        </div>
      </div>
    );
  }

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
                      <h3 className="text-lg font-semibold text-gray-900">{schedule.building?.name || 'Unknown Building'}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(schedule.status)}`}>
                        {schedule.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCollectionTypeColor(schedule.collection_type)}`}>
                        {schedule.collection_type} waste
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{schedule.building?.address || 'No address'}</span>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">{schedule.time_slot}</span>
                      </div>
                      {schedule.assigned_staff && (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500">Assigned to:</span>
                          <span className="font-medium">{schedule.assigned_staff.full_name}</span>
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
                      <button
                        onClick={() => handleUpdateStatus(schedule.id, 'in-progress')}
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                        title="Start Collection"
                      >
                        <Play className="h-4 w-4" />
                      </button>
                    )}
                    {schedule.status === 'in-progress' && (
                      <button
                        onClick={() => handleUpdateStatus(schedule.id, 'completed')}
                        className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        title="Mark as Completed"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteSchedule(schedule.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Schedule"
                    >
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

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Schedule Waste Collection</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleAddSchedule} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Building *
                </label>
                <select
                  value={newSchedule.building_id}
                  onChange={(e) => setNewSchedule({ ...newSchedule, building_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a building</option>
                  {buildings.map((building) => (
                    <option key={building.id} value={building.id}>
                      {building.name} - {building.address}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Collection Date *
                  </label>
                  <input
                    type="date"
                    value={newSchedule.date}
                    onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Slot *
                  </label>
                  <select
                    value={newSchedule.time_slot}
                    onChange={(e) => setNewSchedule({ ...newSchedule, time_slot: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                    <option value="10:30 AM - 11:30 AM">10:30 AM - 11:30 AM</option>
                    <option value="12:00 PM - 01:00 PM">12:00 PM - 01:00 PM</option>
                    <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                    <option value="03:30 PM - 04:30 PM">03:30 PM - 04:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Collection Type *
                  </label>
                  <select
                    value={newSchedule.collection_type}
                    onChange={(e) => setNewSchedule({ ...newSchedule, collection_type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="all">All Waste</option>
                    <option value="wet">Wet Waste</option>
                    <option value="dry">Dry Waste</option>
                    <option value="mixed">Mixed Waste</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned Staff
                  </label>
                  <select
                    value={newSchedule.assigned_staff_id}
                    onChange={(e) => setNewSchedule({ ...newSchedule, assigned_staff_id: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Unassigned</option>
                    {staff.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.full_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={newSchedule.notes}
                  onChange={(e) => setNewSchedule({ ...newSchedule, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Add any notes or special instructions..."
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Schedule Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionScheduler;
