import React, { useState } from 'react';
import { Package, Plus, Search, AlertTriangle, CheckCircle, Minus } from 'lucide-react';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showReorderForm, setShowReorderForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const inventoryItems = [
    {
      id: '1',
      name: 'Compost Activator',
      category: 'Additives',
      currentStock: 15,
      minStock: 10,
      unit: 'kg',
      lastRestocked: '2024-01-10',
      supplier: 'BioTech Solutions',
      status: 'adequate'
    },
    {
      id: '2',
      name: 'pH Testing Strips',
      category: 'Testing Supplies',
      currentStock: 3,
      minStock: 5,
      unit: 'packs',
      lastRestocked: '2024-01-05',
      supplier: 'Lab Equipment Co.',
      status: 'low'
    },
    {
      id: '3',
      name: 'Thermometer (Digital)',
      category: 'Tools',
      currentStock: 8,
      minStock: 3,
      unit: 'pieces',
      lastRestocked: '2024-01-12',
      supplier: 'Instrument World',
      status: 'adequate'
    },
    {
      id: '4',
      name: 'Protective Gloves',
      category: 'Safety Equipment',
      currentStock: 2,
      minStock: 10,
      unit: 'boxes',
      lastRestocked: '2023-12-28',
      supplier: 'Safety First Ltd.',
      status: 'critical'
    },
    {
      id: '5',
      name: 'Mesh Screens (Replacement)',
      category: 'Spare Parts',
      currentStock: 12,
      minStock: 5,
      unit: 'pieces',
      lastRestocked: '2024-01-08',
      supplier: 'Composter Parts Inc.',
      status: 'adequate'
    },
    {
      id: '6',
      name: 'Moisture Meter',
      category: 'Tools',
      currentStock: 4,
      minStock: 2,
      unit: 'pieces',
      lastRestocked: '2024-01-11',
      supplier: 'Instrument World',
      status: 'adequate'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'low':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'adequate':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
      case 'low':
        return <AlertTriangle className="h-4 w-4" />;
      case 'adequate':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ReorderForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Request Reorder</h2>
        </div>
        
        <form className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Name
            </label>
            <input
              type="text"
              value={selectedItem || ''}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requested Quantity
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter quantity needed"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Additional notes or specifications..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setShowReorderForm(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
          <p className="text-gray-600">Track tools, supplies, and equipment</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span className="font-medium text-gray-800">
                {inventoryItems.filter(item => item.status === 'critical' || item.status === 'low').length} Items Need Attention
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search inventory items..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.category}</p>
              </div>
              <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(item.status)}`}>
                {getStatusIcon(item.status)}
                <span className="capitalize">{item.status}</span>
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Current Stock:</span>
                <span className="font-bold text-gray-800">{item.currentStock} {item.unit}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Min Required:</span>
                <span className="font-medium text-gray-600">{item.minStock} {item.unit}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Restocked:</span>
                <span className="text-sm text-gray-500">{item.lastRestocked}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Supplier:</span>
                <span className="text-sm text-gray-500">{item.supplier}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedItem(item.name);
                    setShowReorderForm(true);
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Reorder</span>
                </button>
                <button className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Minus className="h-4 w-4" />
                  <span>Use</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showReorderForm && <ReorderForm />}
    </div>
  );
};

export default Inventory;