import React, { useState } from 'react';
import { Package, Calendar, TrendingUp, Download, Eye, Leaf } from 'lucide-react';
import { format } from 'date-fns';

const HarvestTracking = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  const harvestData = [
    {
      id: '1',
      date: '2024-01-15',
      amount: 4.2,
      quality: 'excellent',
      usage: 'garden',
      notes: 'Rich, dark compost perfect for vegetable garden',
      photos: 3,
      moistureContent: 45,
      phLevel: 6.8,
      nutrientRating: 'high'
    },
    {
      id: '2',
      date: '2024-01-08',
      amount: 5.1,
      quality: 'good',
      usage: 'plants',
      notes: 'Good quality compost used for indoor plants',
      photos: 2,
      moistureContent: 42,
      phLevel: 6.5,
      nutrientRating: 'medium'
    },
    {
      id: '3',
      date: '2024-01-01',
      amount: 3.8,
      quality: 'excellent',
      usage: 'lawn',
      notes: 'Applied to lawn areas, excellent texture',
      photos: 4,
      moistureContent: 48,
      phLevel: 7.0,
      nutrientRating: 'high'
    },
    {
      id: '4',
      date: '2023-12-25',
      amount: 6.2,
      quality: 'good',
      usage: 'garden',
      notes: 'Holiday harvest, shared with neighbors',
      photos: 5,
      moistureContent: 44,
      phLevel: 6.7,
      nutrientRating: 'high'
    },
    {
      id: '5',
      date: '2023-12-18',
      amount: 4.5,
      quality: 'excellent',
      usage: 'vegetables',
      notes: 'Perfect for winter vegetable planting',
      photos: 3,
      moistureContent: 46,
      phLevel: 6.9,
      nutrientRating: 'high'
    }
  ];

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'average':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUsageColor = (usage: string) => {
    switch (usage) {
      case 'garden':
        return 'bg-green-100 text-green-800';
      case 'plants':
        return 'bg-blue-100 text-blue-800';
      case 'lawn':
        return 'bg-yellow-100 text-yellow-800';
      case 'vegetables':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNutrientColor = (rating: string) => {
    switch (rating) {
      case 'high':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const totalHarvest = harvestData.reduce((sum, harvest) => sum + harvest.amount, 0);
  const averageQuality = harvestData.filter(h => h.quality === 'excellent').length / harvestData.length * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Harvest Tracking</h1>
          <p className="text-gray-600">Track your compost harvest and usage</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            <Download className="h-5 w-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Harvest</p>
              <p className="text-3xl font-bold text-green-600">{totalHarvest.toFixed(1)} kg</p>
            </div>
            <Package className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Harvest Sessions</p>
              <p className="text-3xl font-bold text-blue-600">{harvestData.length}</p>
            </div>
            <Calendar className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Excellent Quality</p>
              <p className="text-3xl font-bold text-purple-600">{averageQuality.toFixed(0)}%</p>
            </div>
            <TrendingUp className="h-12 w-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg per Harvest</p>
              <p className="text-3xl font-bold text-orange-600">{(totalHarvest / harvestData.length).toFixed(1)} kg</p>
            </div>
            <Leaf className="h-12 w-12 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Usage Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Compost Usage Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['garden', 'plants', 'lawn', 'vegetables'].map((usage) => {
            const usageAmount = harvestData
              .filter(h => h.usage === usage)
              .reduce((sum, h) => sum + h.amount, 0);
            const percentage = (usageAmount / totalHarvest * 100).toFixed(1);
            
            return (
              <div key={usage} className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 capitalize">{usage}</p>
                <p className="text-2xl font-bold text-gray-800">{usageAmount.toFixed(1)} kg</p>
                <p className="text-sm text-gray-500">{percentage}%</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Harvest History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Harvest History</h3>
        <div className="space-y-4">
          {harvestData.map((harvest) => (
            <div key={harvest.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-bold text-gray-800">
                      {harvest.amount} kg Harvested
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getQualityColor(harvest.quality)}`}>
                      {harvest.quality} quality
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUsageColor(harvest.usage)}`}>
                      {harvest.usage}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(harvest.date), 'MMMM d, yyyy')}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-600">Photos</p>
                  <p className="font-bold text-gray-800">{harvest.photos}</p>
                </div>
              </div>

              {/* Quality Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Moisture</p>
                  <p className="font-bold text-blue-600">{harvest.moistureContent}%</p>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600">pH Level</p>
                  <p className="font-bold text-green-600">{harvest.phLevel}</p>
                </div>
                
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Nutrients</p>
                  <p className={`font-bold ${getNutrientColor(harvest.nutrientRating)}`}>
                    {harvest.nutrientRating}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <p className="text-sm font-medium text-gray-700 mb-1">Usage Notes:</p>
                <p className="text-gray-700">{harvest.notes}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Quality: {harvest.quality} • Usage: {harvest.usage}
                </div>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Eye className="h-4 w-4" />
                  <span>View Photos</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-4">🌱 Compost Usage Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-green-800 mb-2">Best Practices:</h4>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• Mix compost with existing soil (1:3 ratio)</li>
              <li>• Apply during early morning or evening</li>
              <li>• Water lightly after application</li>
              <li>• Store unused compost in dry place</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-green-800 mb-2">Seasonal Usage:</h4>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• Spring: Prepare garden beds</li>
              <li>• Summer: Top dress around plants</li>
              <li>• Monsoon: Boost plant immunity</li>
              <li>• Winter: Prepare for next season</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarvestTracking;