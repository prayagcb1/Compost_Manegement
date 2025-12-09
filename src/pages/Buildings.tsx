import React, { useState } from 'react';
import {
  Building2,
  Users,
  MapPin,
  Phone,
  Calendar,
  Search,
  Filter,
  Plus,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Camera,
  Home,
  Trash2,
  Leaf
} from 'lucide-react';

interface WasteData {
  dryWaste: number;
  wetWaste: number;
  rejectedWaste: number;
}

interface MixedWasteIncident {
  id: string;
  apartmentNumber: string;
  amount: number;
  imageUrl: string;
  timestamp: string;
  description: string;
}

interface Building {
  id: string;
  name: string;
  address: string;
  units: number;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  serviceStatus: 'active' | 'pending' | 'suspended';
  nextPickup: string;
  monthlyVolume: number;
  joinDate: string;
  wasteData: WasteData;
  mixedWasteIncidents: MixedWasteIncident[];
  violatingApartments: string[];
}

const mockBuildings: Building[] = [
  {
    id: '1',
    name: 'Riverside Apartments',
    address: '123 River St, Portland, OR 97201',
    units: 84,
    contact: {
      name: 'Sarah Johnson',
      phone: '(503) 555-0123',
      email: 'sarah@riversideapts.com'
    },
    serviceStatus: 'active',
    nextPickup: '2025-01-15',
    monthlyVolume: 450,
    joinDate: '2024-03-15',
    wasteData: {
      dryWaste: 180,
      wetWaste: 220,
      rejectedWaste: 50
    },
    mixedWasteIncidents: [
      {
        id: '1',
        apartmentNumber: '3B',
        amount: 2.5,
        imageUrl: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=400',
        timestamp: '2025-01-12T10:30:00Z',
        description: 'Mixed plastic and food waste'
      },
      {
        id: '2',
        apartmentNumber: '7A',
        amount: 1.8,
        imageUrl: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=400',
        timestamp: '2025-01-11T14:15:00Z',
        description: 'Paper mixed with organic waste'
      }
    ],
    violatingApartments: ['3B', '7A', '12C']
  },
  {
    id: '2',
    name: 'Green Valley Community',
    address: '456 Oak Ave, Portland, OR 97203',
    units: 156,
    contact: {
      name: 'Michael Chen',
      phone: '(503) 555-0456',
      email: 'mchen@greenvalley.com'
    },
    serviceStatus: 'active',
    nextPickup: '2025-01-16',
    monthlyVolume: 720,
    joinDate: '2024-01-20',
    wasteData: {
      dryWaste: 320,
      wetWaste: 350,
      rejectedWaste: 50
    },
    mixedWasteIncidents: [
      {
        id: '3',
        apartmentNumber: '15D',
        amount: 3.2,
        imageUrl: 'https://images.pexels.com/photos/9324336/pexels-photo-9324336.jpeg?auto=compress&cs=tinysrgb&w=400',
        timestamp: '2025-01-10T09:45:00Z',
        description: 'Glass bottles mixed with food scraps'
      }
    ],
    violatingApartments: ['15D', '22A']
  },
  {
    id: '3',
    name: 'Urban Heights',
    address: '789 Pine St, Portland, OR 97205',
    units: 92,
    contact: {
      name: 'Emma Rodriguez',
      phone: '(503) 555-0789',
      email: 'emma@urbanheights.com'
    },
    serviceStatus: 'pending',
    nextPickup: '2025-01-18',
    monthlyVolume: 380,
    joinDate: '2024-12-01',
    wasteData: {
      dryWaste: 150,
      wetWaste: 180,
      rejectedWaste: 50
    },
    mixedWasteIncidents: [],
    violatingApartments: []
  },
  {
    id: '4',
    name: 'Sunset Towers',
    address: '321 Sunset Blvd, Portland, OR 97210',
    units: 200,
    contact: {
      name: 'David Kim',
      phone: '(503) 555-0321',
      email: 'david@sunsettowers.com'
    },
    serviceStatus: 'active',
    nextPickup: '2025-01-17',
    monthlyVolume: 890,
    joinDate: '2023-11-10',
    wasteData: {
      dryWaste: 400,
      wetWaste: 420,
      rejectedWaste: 70
    },
    mixedWasteIncidents: [
      {
        id: '4',
        apartmentNumber: '8F',
        amount: 4.1,
        imageUrl: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=400',
        timestamp: '2025-01-09T16:20:00Z',
        description: 'Multiple waste types not segregated'
      },
      {
        id: '5',
        apartmentNumber: '14B',
        amount: 2.7,
        imageUrl: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=400',
        timestamp: '2025-01-08T11:10:00Z',
        description: 'Plastic containers with food waste'
      }
    ],
    violatingApartments: ['8F', '14B', '19A', '25C']
  }
];

const Buildings = () => {
  const [buildings] = useState<Building[]>(mockBuildings);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'overview' | 'building-detail'>('overview');

  const filteredBuildings = buildings.filter(building => {
    const matchesSearch = building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         building.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || building.serviceStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalBuildings = buildings.length;
  const activeBuildings = buildings.filter(b => b.serviceStatus === 'active').length;
  const totalUnits = buildings.reduce((sum, b) => sum + b.units, 0);
  const monthlyVolume = buildings.reduce((sum, b) => sum + b.monthlyVolume, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBuildingClick = (building: Building) => {
    setSelectedBuilding(building);
    setViewMode('building-detail');
  };

  const handleBackToOverview = () => {
    setSelectedBuilding(null);
    setViewMode('overview');
  };

  const generateApartmentGrid = (building: Building) => {
    const apartments = [];
    const floorsCount = Math.ceil(building.units / 8);

    for (let floor = 1; floor <= floorsCount; floor++) {
      const unitsOnFloor = Math.min(8, building.units - (floor - 1) * 8);
      for (let unit = 1; unit <= unitsOnFloor; unit++) {
        const apartmentNumber = `${floor}${String.fromCharCode(64 + unit)}`;
        apartments.push(apartmentNumber);
      }
    }

    return apartments;
  };

  if (viewMode === 'building-detail' && selectedBuilding) {
    const apartmentGrid = generateApartmentGrid(selectedBuilding);
    const totalSegregatedWaste = selectedBuilding.wasteData.dryWaste + selectedBuilding.wasteData.wetWaste;
    const totalMixedWaste = selectedBuilding.mixedWasteIncidents.reduce((sum, incident) => sum + incident.amount, 0);

    return (
      <div className="space-y-6">
        <button
          onClick={handleBackToOverview}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Buildings</span>
        </button>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">{selectedBuilding.name}</h1>
          <p className="text-gray-600">Waste segregation tracking and apartment monitoring</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Dry Waste</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{selectedBuilding.wasteData.dryWaste}</p>
                <p className="text-xs text-gray-500 mt-1">kg this month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Trash2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Wet Waste</p>
                <p className="text-3xl font-bold text-emerald-600 mt-2">{selectedBuilding.wasteData.wetWaste}</p>
                <p className="text-xs text-gray-500 mt-1">kg this month</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Leaf className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected Waste</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{selectedBuilding.wasteData.rejectedWaste}</p>
                <p className="text-xs text-gray-500 mt-1">kg this month</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mixed Waste</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{totalMixedWaste.toFixed(1)}</p>
                <p className="text-xs text-gray-500 mt-1">kg violations</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Apartment Status</h3>
              <p className="text-sm text-gray-500 mt-1">Red indicates mixed waste violations</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-8 gap-2">
                {apartmentGrid.map((apartment) => {
                  const isViolating = selectedBuilding.violatingApartments.includes(apartment);
                  return (
                    <div
                      key={apartment}
                      className={`
                        aspect-square rounded-lg border-2 flex items-center justify-center text-xs font-medium transition-colors cursor-pointer
                        ${isViolating
                          ? 'bg-red-100 border-red-300 text-red-800 hover:bg-red-200'
                          : 'bg-emerald-100 border-emerald-300 text-emerald-800 hover:bg-emerald-200'
                        }
                      `}
                      title={isViolating ? `${apartment} - Mixed waste violation` : `${apartment} - Compliant`}
                    >
                      {apartment}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-emerald-100 border-2 border-emerald-300 rounded mr-2"></div>
                    <span className="text-sm text-gray-600">Compliant</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded mr-2"></div>
                    <span className="text-sm text-gray-600">Violations</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {selectedBuilding.violatingApartments.length} of {selectedBuilding.units} units
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Mixed Waste Incidents</h3>
              <p className="text-sm text-gray-500 mt-1">Recent violations with photographic evidence</p>
            </div>
            <div className="p-6">
              {selectedBuilding.mixedWasteIncidents.length > 0 ? (
                <div className="space-y-4">
                  {selectedBuilding.mixedWasteIncidents.map((incident) => (
                    <div key={incident.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Home className="h-4 w-4 text-gray-400" />
                            <span className="font-medium text-gray-900">Apt {incident.apartmentNumber}</span>
                            <span className="text-sm text-orange-600 font-medium">{incident.amount} kg</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{formatTimestamp(incident.timestamp)}</p>
                        </div>
                        <Camera className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="mb-3">
                        <img
                          src={incident.imageUrl}
                          alt={`Mixed waste from apartment ${incident.apartmentNumber}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                      <p className="text-sm text-gray-600">{incident.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                  <p className="text-gray-500">No mixed waste incidents reported</p>
                  <p className="text-sm text-gray-400 mt-1">All residents are properly segregating waste</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{((totalSegregatedWaste / (totalSegregatedWaste + totalMixedWaste)) * 100).toFixed(1)}%</div>
              <div className="text-sm text-gray-600 mt-1">Proper Segregation Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalSegregatedWaste + totalMixedWaste} kg</div>
              <div className="text-sm text-gray-600 mt-1">Total Waste Collected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{selectedBuilding.violatingApartments.length}</div>
              <div className="text-sm text-gray-600 mt-1">Units with Violations</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Buildings & Communities</h1>
          <p className="text-gray-600">Track waste segregation and monitor apartment compliance</p>
        </div>
        <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          <Plus className="h-5 w-5" />
          <span>Add Building</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Buildings</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalBuildings}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Services</p>
              <p className="text-3xl font-bold text-emerald-600 mt-2">{activeBuildings}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Units</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalUnits.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Volume</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{monthlyVolume}</p>
              <p className="text-xs text-gray-500 mt-1">kg</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Leaf className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h2 className="text-lg font-semibold text-gray-900">Building Directory</h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search buildings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Building
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Units
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Violations
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Pickup
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBuildings.map((building) => (
                  <tr
                    key={building.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleBuildingClick(building)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{building.name}</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {building.address}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{building.contact.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {building.contact.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {building.units}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(building.serviceStatus)}`}>
                        {building.serviceStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {building.violatingApartments.length > 0 ? (
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-sm text-red-600 font-medium">
                            {building.violatingApartments.length} units
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-1" />
                          <span className="text-sm text-emerald-600">Clean</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {formatDate(building.nextPickup)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buildings;
