import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Download, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('waste');

  // Sample data for charts
  const wasteProcessingData = [
    { month: 'Jan', wetWaste: 800, gardenWaste: 400, compost: 400 },
    { month: 'Feb', wetWaste: 900, gardenWaste: 450, compost: 450 },
    { month: 'Mar', wetWaste: 700, gardenWaste: 400, compost: 370 },
    { month: 'Apr', wetWaste: 950, gardenWaste: 500, compost: 485 },
    { month: 'May', wetWaste: 1100, gardenWaste: 500, compost: 535 },
    { month: 'Jun', wetWaste: 880, gardenWaste: 500, compost: 460 },
  ];

  const efficiencyData = [
    { week: 'Week 1', efficiency: 88 },
    { week: 'Week 2', efficiency: 92 },
    { week: 'Week 3', efficiency: 85 },
    { week: 'Week 4', efficiency: 94 },
  ];

  const composterStatusData = [
    { name: 'Active', value: 24, color: '#10B981' },
    { name: 'Maintenance', value: 3, color: '#F59E0B' },
    { name: 'Inactive', value: 1, color: '#EF4444' },
    { name: 'Not Utilised', value: 2, color: '#6B7280' },
  ];

  const harvestDistributionData = [
    { name: 'In-house', value: 35, color: '#3B82F6' },
    { name: 'Farmers', value: 30, color: '#10B981' },
    { name: 'Buyers', value: 20, color: '#8B5CF6' },
    { name: 'Not Utilised', value: 15, color: '#6B7280' },
  ];

  const locationTypeData = [
    { name: 'Apartments', value: 15, color: '#3B82F6' },
    { name: 'Villas', value: 8, color: '#8B5CF6' },
    { name: 'Commercial', value: 5, color: '#F59E0B' },
    { name: 'Not Utilised', value: 2, color: '#6B7280' },
  ];

  const performanceData = [
    { staff: 'Raj Kumar', tasks: 145, efficiency: 92 },
    { staff: 'Amit Singh', tasks: 98, efficiency: 88 },
    { staff: 'Priya Patel', tasks: 76, efficiency: 85 },
    { staff: 'Suresh Reddy', tasks: 89, efficiency: 94 },
  ];

  const getDateRangeLabel = () => {
    switch (dateRange) {
      case '7':
        return 'Weekly Report';
      case '30':
        return 'Monthly Report';
      case '90':
        return 'Quarterly Report (3 Months)';
      case '180':
        return 'Half-Yearly Report (6 Months)';
      case '365':
        return 'Annual Report';
      default:
        return 'Report';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Analytics & Reports</h1>
          <p className="text-gray-600">Comprehensive insights into operations and performance</p>
          <p className="text-sm text-green-600 font-medium mt-1">{getDateRangeLabel()}</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="7">Weekly (Last 7 days)</option>
            <option value="30">Monthly (Last 30 days)</option>
            <option value="90">Quarterly (Last 3 months)</option>
            <option value="180">Half-Yearly (Last 6 months)</option>
            <option value="365">Annual (Last year)</option>
          </select>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-5 w-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Waste Processed</p>
              <p className="text-3xl font-bold text-blue-600">8,080 kg</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12% from last period
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Compost Generated</p>
              <p className="text-3xl font-bold text-green-600">2,700 kg</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8% from last period
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Average Efficiency</p>
              <p className="text-3xl font-bold text-purple-600">90%</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +3% from last period
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Special Projects</p>
              <p className="text-3xl font-bold text-orange-600">5</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +2 new this period
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waste Processing Trends */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Waste Processing by Category</h3>
            <select className="px-3 py-1 border border-gray-300 rounded text-sm">
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={wasteProcessingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="wetWaste" fill="#10B981" name="Wet Waste (kg)" />
              <Bar dataKey="gardenWaste" fill="#F59E0B" name="Garden Waste (kg)" />
              <Bar dataKey="compost" fill="#3B82F6" name="Compost Generated (kg)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Efficiency Trends */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Operational Efficiency</h3>
            <span className="text-sm text-gray-500">
              {dateRange === '7' ? 'Last 7 days' : 
               dateRange === '30' ? 'Last 4 weeks' :
               dateRange === '90' ? 'Last 3 months' :
               dateRange === '180' ? 'Last 6 months' : 'Last 12 months'}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[80, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="efficiency" stroke="#8B5CF6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Composter Status Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Composter Status Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={composterStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {composterStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {composterStatusData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Harvest Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Harvest Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={harvestDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {harvestDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {harvestDistributionData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Location Type Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Composters by Location Type</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={locationTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {locationTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {locationTypeData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Performance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Staff Performance</h3>
          <div className="space-y-4">
            {performanceData.map((staff, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{staff.staff}</p>
                  <p className="text-sm text-gray-600">{staff.tasks} tasks completed</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{staff.efficiency}%</p>
                  <p className="text-xs text-gray-500">efficiency</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time Period Summary */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {getDateRangeLabel()} - Key Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">Period Performance</p>
            <p className="text-xl font-bold text-green-600">
              {dateRange === '7' ? 'Excellent' :
               dateRange === '30' ? 'Very Good' :
               dateRange === '90' ? 'Good' :
               dateRange === '180' ? 'Stable' : 'Growing'}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">Trend Direction</p>
            <p className="text-xl font-bold text-blue-600 flex items-center">
              <TrendingUp className="h-5 w-5 mr-1" />
              Upward
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">Utilization Rate</p>
            <p className="text-xl font-bold text-purple-600">
              {100 - harvestDistributionData.find(item => item.name === 'Not Utilised')?.value || 0}%
            </p>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Detailed Performance Summary</h3>
          <p className="text-sm text-gray-600 mt-1">
            Data for {getDateRangeLabel().toLowerCase()}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waste Processed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compost Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Green Valley Apartments</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Apartment</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Wet Waste</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1,250.5 kg</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">425.2 kg</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">34%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Nature's Nest Villa</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Villa</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Garden Waste</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">750.2 kg</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">245.1 kg</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">33%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">City Mall Food Court</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Commercial</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Wet Waste</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2,100.5 kg</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">680.2 kg</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">32%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">Special Project</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Unused Composter #1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Apartment</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">0 kg</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">0 kg</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">0%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Not Utilised</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;