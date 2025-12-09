import React, { useState } from 'react';
import { Calendar, MapPin, Clock, QrCode, Camera, CheckCircle, User, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

const Schedule = () => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  // Tasks assigned by supervisor - these would come from the task management system
  const assignedTasks = [
    {
      id: '1',
      time: '09:00 AM',
      location: 'Green Valley Apartments',
      customerName: 'Green Valley Society',
      composterType: 'O\'Joy',
      composterQR: 'GV-001',
      type: 'Routine Check',
      status: 'completed',
      address: '123 Green Valley Road, Sector 15',
      assignedBy: 'Priya Sharma',
      priority: 'medium',
      estimatedDuration: '45 minutes',
      instructions: 'Check temperature, moisture levels, and overall condition. Take photos of compost quality.',
      requiredTools: ['Thermometer', 'pH strips', 'Camera']
    },
    {
      id: '2',
      time: '11:30 AM',
      location: 'Eco Gardens Complex',
      customerName: 'Eco Gardens Residents',
      composterType: 'Aaditi',
      composterQR: 'EG-003',
      type: 'Waste Collection',
      status: 'completed',
      address: '456 Eco Gardens Lane, Sector 22',
      assignedBy: 'Priya Sharma',
      priority: 'high',
      estimatedDuration: '30 minutes',
      instructions: 'Collect processed compost and add fresh waste. Customer reported slight odor issue.',
      requiredTools: ['Collection bags', 'Gloves', 'Measuring scale']
    },
    {
      id: '3',
      time: '02:00 PM',
      location: 'Sunrise Residency',
      customerName: 'Sunrise Housing Society',
      composterType: 'Ishta',
      composterQR: 'SR-002',
      type: 'Maintenance',
      status: 'in-progress',
      address: '789 Sunrise Avenue, Sector 8',
      assignedBy: 'Priya Sharma',
      priority: 'high',
      estimatedDuration: '2 hours',
      instructions: 'Replace mesh screen and check motor functionality. Customer reported unusual noise.',
      requiredTools: ['Mesh screen', 'Screwdriver set', 'Lubricant', 'Multimeter']
    },
    {
      id: '4',
      time: '04:30 PM',
      location: 'Nature\'s Nest Villa',
      customerName: 'Mr. Rajesh Sharma',
      composterType: 'O\'Joy',
      composterQR: 'NN-005',
      type: 'Customer Training',
      status: 'pending',
      address: '321 Nature\'s Nest Drive, Sector 12',
      assignedBy: 'Priya Sharma',
      priority: 'medium',
      estimatedDuration: '1 hour',
      instructions: 'Provide training on proper waste segregation and composter operation. Customer is new.',
      requiredTools: ['Training materials', 'User manual', 'Sample materials']
    },
  ];

  const handleStartTask = (taskId: string) => {
    setSelectedTask(taskId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Routine Check':
        return 'bg-blue-100 text-blue-800';
      case 'Waste Collection':
        return 'bg-green-100 text-green-800';
      case 'Maintenance':
        return 'bg-orange-100 text-orange-800';
      case 'Customer Training':
        return 'bg-purple-100 text-purple-800';
      case 'Repair':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Today's Schedule</h1>
          <p className="text-gray-600">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
          <p className="text-sm text-blue-600 mt-1">Tasks assigned by your supervisor</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-green-600" />
            <span className="font-medium text-gray-800">{assignedTasks.length} Tasks Assigned</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 text-sm">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-800">{assignedTasks.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 text-sm">Completed</p>
            <p className="text-3xl font-bold text-green-600">
              {assignedTasks.filter(t => t.status === 'completed').length}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 text-sm">In Progress</p>
            <p className="text-3xl font-bold text-blue-600">
              {assignedTasks.filter(t => t.status === 'in-progress').length}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 text-sm">High Priority</p>
            <p className="text-3xl font-bold text-red-600">
              {assignedTasks.filter(t => t.priority === 'high').length}
            </p>
          </div>
        </div>
      </div>

      {/* Assigned Tasks */}
      <div className="grid gap-6">
        {assignedTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span className="font-semibold text-lg text-gray-800">{task.time}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority} priority
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{task.location}</h3>
                  <p className="text-gray-600 mb-2">{task.customerName}</p>
                  <div className="flex items-center space-x-2 text-gray-500 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{task.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500 mb-3">
                    <User className="h-4 w-4" />
                    <span className="text-sm">Assigned by: {task.assignedBy}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-gray-50 px-3 py-2 rounded-lg mb-2">
                    <p className="text-sm text-gray-600">Composter</p>
                    <p className="font-semibold text-gray-800">{task.composterType}</p>
                    <p className="text-xs text-gray-500">{task.composterQR}</p>
                  </div>
                  <div className="bg-blue-50 px-3 py-2 rounded-lg">
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold text-blue-800">{task.estimatedDuration}</p>
                  </div>
                </div>
              </div>

              {/* Task Details */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(task.type)}`}>
                    {task.type}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 mb-2">Instructions:</p>
                <p className="text-gray-700 text-sm">{task.instructions}</p>
              </div>

              {/* Required Tools */}
              {task.requiredTools && task.requiredTools.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Required Tools:</p>
                  <div className="flex flex-wrap gap-2">
                    {task.requiredTools.map((tool, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>QR: {task.composterQR}</span>
                  <span>•</span>
                  <span>Priority: {task.priority}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  {task.status === 'pending' && (
                    <button
                      onClick={() => handleStartTask(task.id)}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <QrCode className="h-4 w-4" />
                      <span>Start Task</span>
                    </button>
                  )}
                  
                  {task.status === 'in-progress' && (
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Camera className="h-4 w-4" />
                        <span>Add Photos</span>
                      </button>
                      <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        <CheckCircle className="h-4 w-4" />
                        <span>Complete</span>
                      </button>
                    </div>
                  )}
                  
                  {task.status === 'completed' && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Task Completed</span>
                    </div>
                  )}

                  <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Contact Supervisor</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Tasks Message */}
      {assignedTasks.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">No tasks assigned for today</p>
          <p className="text-gray-500">Your supervisor will assign tasks as needed</p>
        </div>
      )}

      {/* Instructions for Staff */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-blue-500 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">📋 Task Instructions</h3>
            <div className="text-blue-700 text-sm space-y-1">
              <p>• All tasks are assigned by your supervisor based on customer needs and schedules</p>
              <p>• Check task details and required tools before starting</p>
              <p>• Scan QR code at location to start each task</p>
              <p>• Follow supervisor instructions carefully</p>
              <p>• Take photos and complete work report for each task</p>
              <p>• Contact supervisor if you encounter any issues</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;