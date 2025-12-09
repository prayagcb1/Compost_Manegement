import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Send, 
  Calendar, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  MapPin,
  Clock,
  Camera,
  Plus,
  X,
  QrCode,
  Package,
  BarChart3,
  UserCheck,
  Home
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SupervisorForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    // Section 1: Basic Info
    recordedBy: user?.name || '',
    supervisorId: user?.id || '',
    date: new Date().toISOString().split('T')[0],
    
    // Section 2: Community Location
    communityName: '',
    communityAddress: '',
    qrCode: '',
    locationTimestamp: '',
    gpsCoordinates: '',
    
    // Section 3: Staff in Uniform
    staffInUniform: [],
    
    // Section 4: Is place Neat & Maintained properly
    placeNeatMaintained: [],
    
    // Section 5: Total Bins Count
    totalBins: 1,
    binDetails: [
      { binNumber: 1, capacity: 50, status: 'active', notes: '' }
    ],
    
    // Section 6: Composter Capacity C1-C10
    composterCapacity: Array.from({ length: 10 }, (_, i) => ({
      composterNumber: `C${i + 1}`,
      status: 'not-in-use', // start-loading, full-loaded, harvest, not-in-use
      notes: ''
    })),
    
    // Section 7: Remarks
    harvestingRemarks: [],
    issuesFound: [],
    photos: [],
    additionalNotes: ''
  });

  const [currentLocation, setCurrentLocation] = useState('Getting location...');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showHarvestModal, setShowHarvestModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Staff list for uniform checking
  const availableStaff = [
    'Raj Kumar',
    'Amit Singh', 
    'Priya Patel',
    'Suresh Reddy',
    'Vikram Sharma',
    'Anita Gupta',
    'Rohit Verma',
    'Sneha Joshi'
  ];

  // Get current location
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
          setCurrentLocation(coords);
        },
        () => {
          setCurrentLocation('Location not available');
        }
      );
    }
  }, []);

  const simulateQRScan = (qrCode: string) => {
    const timestamp = new Date().toISOString();
    const timeString = new Date().toLocaleTimeString();
    
    const communityMap: { [key: string]: { name: string, address: string } } = {
      'COMM-GV-001': { 
        name: 'Green Valley Apartments', 
        address: '123 Green Valley Road, Sector 15, Bangalore' 
      },
      'COMM-EG-002': { 
        name: 'Eco Gardens Complex', 
        address: '456 Eco Gardens Lane, Sector 22, Bangalore' 
      },
      'COMM-SR-003': { 
        name: 'Sunrise Residency', 
        address: '789 Sunrise Avenue, Sector 8, Bangalore' 
      },
      'COMM-NN-004': { 
        name: "Nature's Nest Villa Community", 
        address: "321 Nature's Nest Drive, Sector 12, Bangalore" 
      },
      'COMM-SP-005': { 
        name: 'City Mall Food Court Area', 
        address: '100 Commercial Street, City Center, Bangalore' 
      }
    };

    const community = communityMap[qrCode];
    if (community) {
      setFormData(prev => ({
        ...prev,
        communityName: community.name,
        communityAddress: community.address,
        qrCode: qrCode,
        locationTimestamp: timestamp,
        gpsCoordinates: currentLocation
      }));

      setShowQRScanner(false);
      alert(`✅ Community Location Recorded!\n\nCommunity: ${community.name}\nTime: ${timeString}\nGPS: ${currentLocation}`);
    } else {
      alert('❌ Invalid QR Code. Please try again.');
    }
  };

  const addStaffUniformCheck = (staffData: any) => {
    setFormData(prev => ({
      ...prev,
      staffInUniform: [...prev.staffInUniform, {
        ...staffData,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      }]
    }));
    setShowStaffModal(false);
  };

  const removeStaffUniformCheck = (id: string) => {
    setFormData(prev => ({
      ...prev,
      staffInUniform: prev.staffInUniform.filter(staff => staff.id !== id)
    }));
  };

  const addPlaceCheck = (placeData: any) => {
    setFormData(prev => ({
      ...prev,
      placeNeatMaintained: [...prev.placeNeatMaintained, {
        ...placeData,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      }]
    }));
    setShowPlaceModal(false);
  };

  const removePlaceCheck = (id: string) => {
    setFormData(prev => ({
      ...prev,
      placeNeatMaintained: prev.placeNeatMaintained.filter(place => place.id !== id)
    }));
  };

  const updateBinCount = (count: number) => {
    const newBins = Array.from({ length: count }, (_, index) => ({
      binNumber: index + 1,
      capacity: 50,
      status: formData.binDetails[index]?.status || 'active',
      notes: formData.binDetails[index]?.notes || ''
    }));

    setFormData(prev => ({
      ...prev,
      totalBins: count,
      binDetails: newBins
    }));
  };

  const updateBinDetail = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      binDetails: prev.binDetails.map((bin, i) => 
        i === index ? { ...bin, [field]: value } : bin
      )
    }));
  };

  const updateComposterCapacity = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      composterCapacity: prev.composterCapacity.map((composter, i) => 
        i === index ? { ...composter, [field]: value } : composter
      )
    }));
  };

  const addHarvestRemark = (harvestData: any) => {
    setFormData(prev => ({
      ...prev,
      harvestingRemarks: [...prev.harvestingRemarks, {
        ...harvestData,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      }]
    }));
    setShowHarvestModal(false);
  };

  const addIssue = (issueData: any) => {
    setFormData(prev => ({
      ...prev,
      issuesFound: [...prev.issuesFound, {
        ...issueData,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      }]
    }));
    setShowIssueModal(false);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }));
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const submitForm = async () => {
    try {
      const submissionTime = new Date().toISOString();
      const reportData = {
        ...formData,
        submissionTimestamp: submissionTime
      };

      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('✅ Supervisor report submitted successfully!');
      
      // Reset form
      setFormData({
        recordedBy: user?.name || '',
        supervisorId: user?.id || '',
        date: new Date().toISOString().split('T')[0],
        communityName: '',
        communityAddress: '',
        qrCode: '',
        locationTimestamp: '',
        gpsCoordinates: '',
        staffInUniform: [],
        placeNeatMaintained: [],
        totalBins: 1,
        binDetails: [{ binNumber: 1, capacity: 50, status: 'active', notes: '' }],
        composterCapacity: Array.from({ length: 10 }, (_, i) => ({
          composterNumber: `C${i + 1}`,
          status: 'not-in-use',
          notes: ''
        })),
        harvestingRemarks: [],
        issuesFound: [],
        photos: [],
        additionalNotes: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('❌ Error submitting form. Please try again.');
    }
  };

  const getComposterStatusColor = (status: string) => {
    switch (status) {
      case 'start-loading':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'full-loaded':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'harvest':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'not-in-use':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getComposterStatusIcon = (status: string) => {
    switch (status) {
      case 'start-loading':
        return '🔄';
      case 'full-loaded':
        return '📦';
      case 'harvest':
        return '🌱';
      case 'not-in-use':
        return '⭕';
      default:
        return '❓';
    }
  };

  const getUniformStatusColor = (status: string) => {
    switch (status) {
      case 'yes':
        return 'bg-green-100 text-green-800';
      case 'no':
        return 'bg-red-100 text-red-800';
      case 'other':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlaceStatusColor = (status: string) => {
    switch (status) {
      case 'yes':
        return 'bg-green-100 text-green-800';
      case 'no':
        return 'bg-red-100 text-red-800';
      case 'other':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const QRScannerModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-sm mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Scan Community QR</h3>
          <button
            onClick={() => setShowQRScanner(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="relative">
          <div className="w-full h-64 bg-black rounded-lg flex items-center justify-center">
            <QrCode className="h-16 w-16 text-white" />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 border-2 border-white rounded-lg opacity-50"></div>
          </div>
        </div>
        
        <p className="text-center text-gray-600 mt-4 text-sm">
          Scan community QR code to auto-fill location details
        </p>
        
        <div className="mt-4 space-y-2">
          <p className="text-xs text-gray-500 text-center">Demo Community QR Codes:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => simulateQRScan('COMM-GV-001')}
              className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm"
            >
              Green Valley
            </button>
            <button
              onClick={() => simulateQRScan('COMM-EG-002')}
              className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm"
            >
              Eco Gardens
            </button>
            <button
              onClick={() => simulateQRScan('COMM-SR-003')}
              className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm"
            >
              Sunrise
            </button>
            <button
              onClick={() => simulateQRScan('COMM-NN-004')}
              className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm"
            >
              Nature's Nest
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const StaffUniformModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-lg font-bold mb-4">👔 Check Staff Uniform</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          addStaffUniformCheck({
            staffName: formData.get('staffName'),
            uniformStatus: formData.get('uniformStatus'),
            notes: formData.get('notes')
          });
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Staff Member
              </label>
              <select name="staffName" className="w-full p-3 border rounded-lg" required>
                <option value="">Select staff member</option>
                {availableStaff.map((staff, index) => (
                  <option key={index} value={staff}>
                    {staff}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Staff in Uniform?
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="uniformStatus" value="yes" required />
                  <span className="text-green-700">✅ Yes - Properly dressed in uniform</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="uniformStatus" value="no" required />
                  <span className="text-red-700">❌ No - Not in proper uniform</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="uniformStatus" value="other" required />
                  <span className="text-yellow-700">⚠️ Other - Partial/Issues with uniform</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                placeholder="Additional observations about uniform, cleanliness, professional appearance..."
                rows={3}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowStaffModal(false)}
              className="flex-1 py-2 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg"
            >
              Add Check
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const PlaceNeatModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-lg font-bold mb-4">🏠 Check Place Cleanliness</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          addPlaceCheck({
            areaType: formData.get('areaType'),
            cleanlinessStatus: formData.get('cleanlinessStatus'),
            notes: formData.get('notes')
          });
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area/Location Type
              </label>
              <select name="areaType" className="w-full p-3 border rounded-lg" required>
                <option value="">Select area type</option>
                <option value="composter-area">🗂️ Composter Area</option>
                <option value="bin-storage">🗃️ Bin Storage Area</option>
                <option value="work-area">🔧 Work Area</option>
                <option value="entrance">🚪 Entrance/Reception</option>
                <option value="pathways">🛤️ Pathways/Walkways</option>
                <option value="garden">🌿 Garden/Landscaping</option>
                <option value="parking">🚗 Parking Area</option>
                <option value="general">🏢 General Premises</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Is place Neat & Maintained properly?
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="cleanlinessStatus" value="yes" required />
                  <span className="text-green-700">✅ Yes - Clean, organized, well-maintained</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="cleanlinessStatus" value="no" required />
                  <span className="text-red-700">❌ No - Dirty, disorganized, poorly maintained</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="cleanlinessStatus" value="other" required />
                  <span className="text-yellow-700">⚠️ Other - Partially clean, needs improvement</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observations & Notes
              </label>
              <textarea
                name="notes"
                placeholder="Describe cleanliness, organization, maintenance issues, suggestions for improvement..."
                rows={4}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowPlaceModal(false)}
              className="flex-1 py-2 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-green-600 text-white rounded-lg"
            >
              Add Check
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const HarvestModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-lg font-bold mb-4">🌱 Add Harvesting Remark</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          addHarvestRemark({
            binNumber: formData.get('binNumber'),
            harvestAmount: formData.get('harvestAmount'),
            quality: formData.get('quality'),
            usage: formData.get('usage'),
            customerSatisfaction: formData.get('customerSatisfaction'),
            notes: formData.get('notes')
          });
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bin Number
              </label>
              <select name="binNumber" className="w-full p-3 border rounded-lg" required>
                <option value="">Select bin</option>
                {formData.binDetails.map((bin, index) => (
                  <option key={index} value={bin.binNumber}>
                    Bin #{bin.binNumber} (50kg)
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harvest Amount (kg)
              </label>
              <input
                name="harvestAmount"
                type="number"
                step="0.1"
                placeholder="15.5"
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compost Quality
              </label>
              <select name="quality" className="w-full p-3 border rounded-lg" required>
                <option value="">Select quality</option>
                <option value="excellent">⭐⭐⭐ Excellent - Dark, rich, earthy</option>
                <option value="good">⭐⭐ Good - Well decomposed</option>
                <option value="average">⭐ Average - Needs more time</option>
                <option value="poor">❌ Poor - Not ready</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Planned Usage
              </label>
              <select name="usage" className="w-full p-3 border rounded-lg" required>
                <option value="">Select usage</option>
                <option value="inhouse">🏠 In-house gardening</option>
                <option value="farmer">🚜 Given to local farmer</option>
                <option value="buyer">💰 Sold to buyer</option>
                <option value="community">🏘️ Community garden</option>
                <option value="distribution">📦 Free distribution</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Satisfaction
              </label>
              <select name="customerSatisfaction" className="w-full p-3 border rounded-lg" required>
                <option value="">Rate satisfaction</option>
                <option value="5">⭐⭐⭐⭐⭐ Very Happy</option>
                <option value="4">⭐⭐⭐⭐ Happy</option>
                <option value="3">⭐⭐⭐ Satisfied</option>
                <option value="2">⭐⭐ Needs Improvement</option>
                <option value="1">⭐ Unhappy</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                placeholder="Quality observations, customer feedback, usage plans..."
                rows={3}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowHarvestModal(false)}
              className="flex-1 py-2 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-green-600 text-white rounded-lg"
            >
              Add Remark
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const IssueModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-lg font-bold mb-4">⚠️ Report Issue</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          addIssue({
            binNumber: formData.get('binNumber'),
            issueType: formData.get('issueType'),
            severity: formData.get('severity'),
            description: formData.get('description'),
            actionTaken: formData.get('actionTaken'),
            followUpRequired: formData.get('followUpRequired') === 'on',
            staffAssigned: formData.get('staffAssigned')
          });
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bin Number (if applicable)
              </label>
              <select name="binNumber" className="w-full p-3 border rounded-lg">
                <option value="">General issue / All bins</option>
                {formData.binDetails.map((bin, index) => (
                  <option key={index} value={bin.binNumber}>
                    Bin #{bin.binNumber}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Type
              </label>
              <select name="issueType" className="w-full p-3 border rounded-lg" required>
                <option value="">Select issue type</option>
                <option value="temperature">🌡️ Temperature Problem</option>
                <option value="smell">👃 Bad Smell</option>
                <option value="leakage">💧 Water Leakage</option>
                <option value="mechanical">⚙️ Mechanical Issue</option>
                <option value="electrical">⚡ Electrical Problem</option>
                <option value="pest">🐛 Pest/Insects</option>
                <option value="capacity">📦 Capacity Issue</option>
                <option value="customer">👤 Customer Complaint</option>
                <option value="staff">👷 Staff Issue</option>
                <option value="maintenance">🔧 Maintenance Required</option>
                <option value="safety">🛡️ Safety Concern</option>
                <option value="cleanliness">🧹 Cleanliness Issue</option>
                <option value="other">❓ Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity Level
              </label>
              <select name="severity" className="w-full p-3 border rounded-lg" required>
                <option value="">Select severity</option>
                <option value="low">🟢 Low - Minor issue, can wait</option>
                <option value="medium">🟡 Medium - Needs attention soon</option>
                <option value="high">🔴 High - Urgent, affects operation</option>
                <option value="critical">🚨 Critical - Emergency, stop operation</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Description
              </label>
              <textarea
                name="description"
                placeholder="Describe the issue in detail..."
                rows={3}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Immediate Action Taken
              </label>
              <textarea
                name="actionTaken"
                placeholder="What immediate action was taken to address the issue?"
                rows={2}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Staff Assigned
              </label>
              <input
                name="staffAssigned"
                type="text"
                placeholder="Staff member assigned to resolve"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input type="checkbox" name="followUpRequired" id="followUpRequired" />
              <label htmlFor="followUpRequired" className="text-sm text-gray-700">
                Follow-up required within 24 hours
              </label>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowIssueModal(false)}
              className="flex-1 py-2 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-red-600 text-white rounded-lg"
            >
              Report Issue
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
          <h1 className="text-3xl font-bold text-gray-800">Daily Supervisor Report</h1>
          <p className="text-gray-600">Submit comprehensive daily supervision report</p>
        </div>
        <div className="bg-blue-100 px-4 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-800">Zone: {user?.assignedZone || 'Central Zone'}</span>
          </div>
        </div>
      </div>

      {/* Section 1: Recorded By & Date */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-500" />
          1. Supervisor Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recorded By (Supervisor)</label>
            <input
              type="text"
              value={formData.recordedBy}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Time</label>
            <input
              type="text"
              value={new Date().toLocaleTimeString()}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Community Location with QR Scanner */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <QrCode className="h-5 w-5 mr-2 text-green-500" />
          2. Community Location
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Community Name</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={formData.communityName}
                onChange={(e) => setFormData(prev => ({ ...prev, communityName: e.target.value }))}
                placeholder="Scan QR to auto-fill or enter manually"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={() => setShowQRScanner(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <QrCode className="h-4 w-4" />
                <span>Scan QR</span>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">QR Code</label>
            <input
              type="text"
              value={formData.qrCode}
              readOnly
              placeholder="Auto-filled when QR is scanned"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Community Address</label>
          <textarea
            value={formData.communityAddress}
            onChange={(e) => setFormData(prev => ({ ...prev, communityAddress: e.target.value }))}
            placeholder="Auto-filled when QR is scanned or enter manually"
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        {formData.locationTimestamp && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-800">📍 Location & Time Recorded:</p>
            <p className="text-green-700">
              Time: {new Date(formData.locationTimestamp).toLocaleString()}
            </p>
            <p className="text-green-700">GPS: {formData.gpsCoordinates}</p>
          </div>
        )}
      </div>

      {/* Section 3: Staff in Uniform */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <UserCheck className="h-5 w-5 mr-2 text-blue-500" />
            3. Staff in Uniform ({formData.staffInUniform.length})
          </h3>
          <button
            onClick={() => setShowStaffModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>Check Staff Uniform</span>
          </button>
        </div>
        
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 font-medium mb-2">👔 Uniform Check Guidelines:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
            <div className="flex items-center space-x-1">
              <span>✅</span>
              <span className="text-blue-700">Yes - Proper uniform, clean, professional</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>❌</span>
              <span className="text-blue-700">No - Not wearing uniform or inappropriate dress</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>⚠️</span>
              <span className="text-blue-700">Other - Partial uniform or minor issues</span>
            </div>
          </div>
        </div>

        {formData.staffInUniform.length > 0 ? (
          <div className="space-y-3">
            {formData.staffInUniform.map((staff, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-gray-800">{staff.staffName}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUniformStatusColor(staff.uniformStatus)}`}>
                      {staff.uniformStatus === 'yes' ? '✅ Yes' :
                       staff.uniformStatus === 'no' ? '❌ No' : '⚠️ Other'}
                    </span>
                  </div>
                  <button
                    onClick={() => removeStaffUniformCheck(staff.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                {staff.notes && (
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{staff.notes}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Checked: {new Date(staff.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No staff uniform checks recorded yet</p>
        )}

        {/* Uniform Summary */}
        {formData.staffInUniform.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-3">👔 Uniform Compliance Summary</h4>
            <div className="grid grid-cols-3 gap-4">
              {['yes', 'no', 'other'].map((status) => {
                const count = formData.staffInUniform.filter(s => s.uniformStatus === status).length;
                const label = status === 'yes' ? 'Proper Uniform' : 
                             status === 'no' ? 'Not in Uniform' : 'Partial/Issues';
                return (
                  <div key={status} className="text-center">
                    <div className={`px-3 py-2 rounded-lg ${getUniformStatusColor(status)}`}>
                      <p className="font-bold text-2xl">{count}</p>
                      <p className="text-sm">{label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Section 4: Is place Neat & Maintained properly */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Home className="h-5 w-5 mr-2 text-green-500" />
            4. Is place Neat & Maintained properly ({formData.placeNeatMaintained.length})
          </h3>
          <button
            onClick={() => setShowPlaceModal(true)}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <Plus className="h-4 w-4" />
            <span>Check Place Cleanliness</span>
          </button>
        </div>
        
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 font-medium mb-2">🏠 Place Maintenance Guidelines:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
            <div className="flex items-center space-x-1">
              <span>✅</span>
              <span className="text-green-700">Yes - Clean, organized, well-maintained</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>❌</span>
              <span className="text-green-700">No - Dirty, disorganized, poorly maintained</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>⚠️</span>
              <span className="text-green-700">Other - Partially clean, needs improvement</span>
            </div>
          </div>
        </div>

        {formData.placeNeatMaintained.length > 0 ? (
          <div className="space-y-3">
            {formData.placeNeatMaintained.map((place, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-gray-800">{place.areaType.replace('-', ' ')}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPlaceStatusColor(place.cleanlinessStatus)}`}>
                      {place.cleanlinessStatus === 'yes' ? '✅ Yes' :
                       place.cleanlinessStatus === 'no' ? '❌ No' : '⚠️ Other'}
                    </span>
                  </div>
                  <button
                    onClick={() => removePlaceCheck(place.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                {place.notes && (
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{place.notes}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Checked: {new Date(place.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No place cleanliness checks recorded yet</p>
        )}

        {/* Place Cleanliness Summary */}
        {formData.placeNeatMaintained.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-3">🏠 Place Maintenance Summary</h4>
            <div className="grid grid-cols-3 gap-4">
              {['yes', 'no', 'other'].map((status) => {
                const count = formData.placeNeatMaintained.filter(p => p.cleanlinessStatus === status).length;
                const label = status === 'yes' ? 'Well Maintained' : 
                             status === 'no' ? 'Needs Cleaning' : 'Needs Improvement';
                return (
                  <div key={status} className="text-center">
                    <div className={`px-3 py-2 rounded-lg ${getPlaceStatusColor(status)}`}>
                      <p className="font-bold text-2xl">{count}</p>
                      <p className="text-sm">{label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Section 5: Total Number of Bins */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Package className="h-5 w-5 mr-2 text-purple-500" />
          5. Total Number of Bins (50 kg each)
        </h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Number of Bins</label>
          <select
            value={formData.totalBins}
            onChange={(e) => updateBinCount(parseInt(e.target.value))}
            className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} bin{i > 0 ? 's' : ''} (50 kg each)
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-800">Bin Details:</h4>
          {formData.binDetails.map((bin, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bin #{bin.binNumber} Status
                  </label>
                  <select
                    value={bin.status}
                    onChange={(e) => updateBinDetail(index, 'status', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="active">✅ Active - Working properly</option>
                    <option value="maintenance">🔧 Under Maintenance</option>
                    <option value="full">📦 Full - Needs emptying</option>
                    <option value="issue">⚠️ Has Issues</option>
                    <option value="inactive">❌ Inactive</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes for Bin #{bin.binNumber}
                  </label>
                  <input
                    type="text"
                    value={bin.notes}
                    onChange={(e) => updateBinDetail(index, 'notes', e.target.value)}
                    placeholder="Any specific observations or notes for this bin..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 6: Composter Capacity C1-C10 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-indigo-500" />
          6. Composter Capacity Status (C1 to C10)
        </h3>
        
        <div className="mb-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <p className="text-sm text-indigo-800 font-medium mb-2">📊 Capacity Status Guide:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div className="flex items-center space-x-1">
              <span>🔄</span>
              <span className="text-indigo-700">Start Loading - Beginning to fill</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>📦</span>
              <span className="text-indigo-700">Full Loaded - Ready for processing</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🌱</span>
              <span className="text-indigo-700">Harvest - Ready to collect compost</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>⭕</span>
              <span className="text-indigo-700">Not in Use - Currently inactive</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.composterCapacity.map((composter, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-800 text-lg">
                  Composter {composter.composterNumber}
                </h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getComposterStatusColor(composter.status)}`}>
                  {getComposterStatusIcon(composter.status)} {composter.status.replace('-', ' ')}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity Status
                  </label>
                  <select
                    value={composter.status}
                    onChange={(e) => updateComposterCapacity(index, 'status', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="not-in-use">⭕ Not in Use</option>
                    <option value="start-loading">🔄 Start Loading</option>
                    <option value="full-loaded">📦 Full Loaded</option>
                    <option value="harvest">🌱 Harvest Ready</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes for {composter.composterNumber}
                  </label>
                  <input
                    type="text"
                    value={composter.notes}
                    onChange={(e) => updateComposterCapacity(index, 'notes', e.target.value)}
                    placeholder="Capacity observations, timing, quality notes..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Capacity Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-3">📈 Capacity Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['start-loading', 'full-loaded', 'harvest', 'not-in-use'].map((status) => {
              const count = formData.composterCapacity.filter(c => c.status === status).length;
              return (
                <div key={status} className="text-center">
                  <div className={`px-3 py-2 rounded-lg ${getComposterStatusColor(status)}`}>
                    <p className="font-bold text-2xl">{count}</p>
                    <p className="text-sm capitalize">{status.replace('-', ' ')}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section 7: Remarks about Harvesting and Issues */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
          7. Remarks about Harvesting and Issues
        </h3>

        {/* Harvesting Remarks */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-800 flex items-center">
              🌱 Harvesting Remarks ({formData.harvestingRemarks.length})
            </h4>
            <button
              onClick={() => setShowHarvestModal(true)}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Harvest Remark</span>
            </button>
          </div>
          
          {formData.harvestingRemarks.length > 0 ? (
            <div className="space-y-3">
              {formData.harvestingRemarks.map((remark, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-800">
                      Bin #{remark.binNumber} - {remark.harvestAmount}kg harvested
                    </h5>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {remark.quality} quality
                      </span>
                      <span className="text-yellow-500">
                        {'⭐'.repeat(parseInt(remark.customerSatisfaction))}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Usage:</strong> {remark.usage}
                  </p>
                  {remark.notes && (
                    <p className="text-sm text-gray-600">{remark.notes}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Recorded: {new Date(remark.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No harvesting remarks added yet</p>
          )}
        </div>

        {/* Issues Found */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-800 flex items-center">
              ⚠️ Issues Found ({formData.issuesFound.length})
            </h4>
            <button
              onClick={() => setShowIssueModal(true)}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              <Plus className="h-4 w-4" />
              <span>Report Issue</span>
            </button>
          </div>
          
          {formData.issuesFound.length > 0 ? (
            <div className="space-y-3">
              {formData.issuesFound.map((issue, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-800">
                      {issue.binNumber ? `Bin #${issue.binNumber}` : 'General'} - {issue.issueType}
                    </h5>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      issue.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      issue.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                      issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {issue.severity} severity
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{issue.description}</p>
                  {issue.actionTaken && (
                    <p className="text-sm text-blue-700 mb-2">
                      <strong>Action Taken:</strong> {issue.actionTaken}
                    </p>
                  )}
                  {issue.staffAssigned && (
                    <p className="text-sm text-purple-700 mb-2">
                      <strong>Assigned to:</strong> {issue.staffAssigned}
                    </p>
                  )}
                  {issue.followUpRequired && (
                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full mb-2">
                      Follow-up required
                    </span>
                  )}
                  <p className="text-xs text-gray-500">
                    Reported: {new Date(issue.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No issues reported</p>
          )}
        </div>

        {/* Photos */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-4 flex items-center">
            <Camera className="h-5 w-5 mr-2 text-purple-500" />
            Photos ({formData.photos.length})
          </h4>
          
          <label className="block">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-500">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 font-medium">Take Photos</p>
              <p className="text-sm text-gray-500">Bins, composters, staff uniforms, place cleanliness, harvesting, issues, general supervision</p>
            </div>
          </label>

          {formData.photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Supervision photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes & Observations
          </label>
          <textarea
            value={formData.additionalNotes}
            onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
            rows={4}
            placeholder="Any additional observations, recommendations, or notes about the supervision visit..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <button
          onClick={submitForm}
          className="w-full bg-green-600 text-white py-4 px-6 rounded-lg text-lg font-bold flex items-center justify-center space-x-2 hover:bg-green-700 transition-colors"
        >
          <Send className="h-6 w-6" />
          <span>Submit Supervisor Report</span>
        </button>
        <p className="text-center text-sm text-gray-500 mt-2">
          Report includes location verification, staff uniform checks, place cleanliness assessment, bin status, composter capacity (C1-C10), harvesting details, and issue tracking
        </p>
      </div>

      {/* Modals */}
      {showQRScanner && <QRScannerModal />}
      {showStaffModal && <StaffUniformModal />}
      {showPlaceModal && <PlaceNeatModal />}
      {showHarvestModal && <HarvestModal />}
      {showIssueModal && <IssueModal />}
    </div>
  );
};

export default SupervisorForm;