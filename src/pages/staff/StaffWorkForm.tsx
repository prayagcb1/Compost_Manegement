import React, { useState } from 'react';
import { 
  Send, 
  QrCode,
  X,
  CheckCircle,
  XCircle,
  Wrench,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const StaffWorkForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    staffName: user?.name || '',
    zone: user?.assignedZone || '',
    startTime: '',
    endTime: '',
    location: '',
    customerName: '',
    workCompleted: false,
    locationTimestamp: '',
    staffInUniform: '',
    placeNeatMaintained: '',
    compostersCondition: '',
    compostersConditionOther: '',
    harvestingTimeline: '',
    harvestingTimelineOther: '',
    staffFeedback: [],
    staffFeedbackOther: ''
  });

  const [currentLocation, setCurrentLocation] = useState('Getting location...');
  const [showQRScanner, setShowQRScanner] = useState(false);

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
    
    const composterMap: { [key: string]: { location: string, type: string, customer: string } } = {
      'GV-001': { location: 'Green Valley Apartments', type: "O'Joy", customer: 'Green Valley Society' },
      'EG-003': { location: 'Eco Gardens Complex', type: 'Aaditi', customer: 'Eco Gardens Residents' },
      'SR-002': { location: 'Sunrise Residency', type: 'Ishta', customer: 'Sunrise Housing Society' },
      'NN-005': { location: "Nature's Nest Villa", type: "O'Joy", customer: 'Mr. Rajesh Sharma' },
      'SP-001': { location: 'City Mall Food Court', type: 'Aaditi', customer: 'City Mall Management' }
    };

    const composter = composterMap[qrCode];
    if (composter) {
      setFormData(prev => ({
        ...prev,
        location: composter.location,
        customerName: composter.customer,
        locationTimestamp: timestamp
      }));

      setShowQRScanner(false);
      alert(`✅ Location Recorded!\n\nLocation: ${composter.location}\nTime: ${timeString}`);
    } else {
      alert('❌ Invalid QR Code. Please try again.');
    }
  };

  const handleStaffFeedbackChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      staffFeedback: checked 
        ? [...prev.staffFeedback, value]
        : prev.staffFeedback.filter(item => item !== value)
    }));
  };

  const submitWorkReport = async () => {
    try {
      const submissionTime = new Date().toISOString();
      const reportData = {
        ...formData,
        submissionTimestamp: submissionTime
      };

      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('✅ Work report submitted successfully!');
      
      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        staffName: user?.name || '',
        zone: user?.assignedZone || '',
        startTime: '',
        endTime: '',
        workType: '',
        placeNeatMaintained: '',
        compostersCondition: '',
        compostersConditionOther: '',
        harvestingTimeline: '',
        harvestingTimelineOther: '',
        staffFeedback: [],
        staffFeedbackOther: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('❌ Error submitting form. Please try again.');
    }
  };

  const QRScannerModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-sm mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Scan Location QR</h3>
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
          Point camera at location QR code to record location & time
        </p>
        
        <div className="mt-4 space-y-2">
          <p className="text-xs text-gray-500 text-center">Demo QR Codes:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => simulateQRScan('GV-001')}
              className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm"
            >
              GV-001
            </button>
            <button
              onClick={() => simulateQRScan('EG-003')}
              className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm"
            >
              EG-003
            </button>
            <button
              onClick={() => simulateQRScan('SR-002')}
              className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm"
            >
              SR-002
            </button>
            <button
              onClick={() => simulateQRScan('NN-005')}
              className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm"
            >
              NN-005
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Daily Work Report</h1>
          <p className="text-gray-600">Submit your daily work details</p>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Staff Name</label>
            <input
              type="text"
              value={formData.staffName}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Location Information with QR Scanner */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <QrCode className="h-5 w-5 mr-2 text-blue-500" />
          Location Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Work Location</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Scan QR to auto-fill location & time"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={() => setShowQRScanner(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <QrCode className="h-4 w-4" />
                <span>Scan</span>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
              placeholder="Auto-filled when QR is scanned"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {formData.locationTimestamp && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-800">📍 Location Recorded:</p>
            <p className="text-green-700">
              Time: {new Date(formData.locationTimestamp).toLocaleString()}
            </p>
          </div>
        )}
      </div>


      {/* Is place Neat & Maintained properly */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Is place Neat & Maintained properly?</h3>
        
        <div className="mb-6">
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="placeNeatMaintained"
                value="yes"
                checked={formData.placeNeatMaintained === 'yes'}
                onChange={(e) => setFormData(prev => ({ ...prev, placeNeatMaintained: e.target.value }))}
                className="w-4 h-4 text-green-600"
              />
              <span className="text-green-700 font-medium">✅ Yes - Overall place is clean and well-maintained</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="placeNeatMaintained"
                value="no"
                checked={formData.placeNeatMaintained === 'no'}
                onChange={(e) => setFormData(prev => ({ ...prev, placeNeatMaintained: e.target.value }))}
                className="w-4 h-4 text-red-600"
              />
              <span className="text-red-700 font-medium">❌ No - Place needs cleaning and maintenance</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="placeNeatMaintained"
                value="other"
                checked={formData.placeNeatMaintained === 'other'}
                onChange={(e) => setFormData(prev => ({ ...prev, placeNeatMaintained: e.target.value }))}
                className="w-4 h-4 text-yellow-600"
              />
              <span className="text-yellow-700 font-medium">⚠️ Other - Some areas need attention</span>
            </label>
          </div>
        </div>
      </div>

      {/* Composters Condition */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Wrench className="h-5 w-5 mr-2 text-orange-500" />
          Composters Condition *
        </h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="compostersCondition"
              value="good"
              checked={formData.compostersCondition === 'good'}
              onChange={(e) => setFormData(prev => ({ ...prev, compostersCondition: e.target.value }))}
              className="w-4 h-4 text-green-600"
            />
            <span className="text-green-700 font-medium">✅ Good</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="compostersCondition"
              value="needs-repairs-later"
              checked={formData.compostersCondition === 'needs-repairs-later'}
              onChange={(e) => setFormData(prev => ({ ...prev, compostersCondition: e.target.value }))}
              className="w-4 h-4 text-yellow-600"
            />
            <span className="text-yellow-700 font-medium">🔧 Needs Repairs later</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="compostersCondition"
              value="slightly-damaged"
              checked={formData.compostersCondition === 'slightly-damaged'}
              onChange={(e) => setFormData(prev => ({ ...prev, compostersCondition: e.target.value }))}
              className="w-4 h-4 text-orange-600"
            />
            <span className="text-orange-700 font-medium">⚠️ Slightly Damaged</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="compostersCondition"
              value="immediate-repairs"
              checked={formData.compostersCondition === 'immediate-repairs'}
              onChange={(e) => setFormData(prev => ({ ...prev, compostersCondition: e.target.value }))}
              className="w-4 h-4 text-red-600"
            />
            <span className="text-red-700 font-medium">🚨 Immediate repairs</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="compostersCondition"
              value="other"
              checked={formData.compostersCondition === 'other'}
              onChange={(e) => setFormData(prev => ({ ...prev, compostersCondition: e.target.value }))}
              className="w-4 h-4 text-purple-600"
            />
            <span className="text-purple-700 font-medium">🔍 Other:</span>
          </label>
        </div>
        
        {formData.compostersCondition === 'other' && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Please specify other condition:
            </label>
            <input
              type="text"
              value={formData.compostersConditionOther}
              onChange={(e) => setFormData(prev => ({ ...prev, compostersConditionOther: e.target.value }))}
              placeholder="Describe the condition..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        )}
      </div>

      {/* Harvesting Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-green-500" />
          Harvesting Timeline *
        </h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="harvestingTimeline"
              value="harvest-next-week"
              checked={formData.harvestingTimeline === 'harvest-next-week'}
              onChange={(e) => setFormData(prev => ({ ...prev, harvestingTimeline: e.target.value }))}
              className="w-4 h-4 text-green-600"
            />
            <span className="text-green-700 font-medium">📅 Harvest next week</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="harvestingTimeline"
              value="harvest-in-2-weeks"
              checked={formData.harvestingTimeline === 'harvest-in-2-weeks'}
              onChange={(e) => setFormData(prev => ({ ...prev, harvestingTimeline: e.target.value }))}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-blue-700 font-medium">📅 Harvest in 2 weeks</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="harvestingTimeline"
              value="harvest-in-4-weeks"
              checked={formData.harvestingTimeline === 'harvest-in-4-weeks'}
              onChange={(e) => setFormData(prev => ({ ...prev, harvestingTimeline: e.target.value }))}
              className="w-4 h-4 text-yellow-600"
            />
            <span className="text-yellow-700 font-medium">📅 Harvest in 4 weeks</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="harvestingTimeline"
              value="harvested"
              checked={formData.harvestingTimeline === 'harvested'}
              onChange={(e) => setFormData(prev => ({ ...prev, harvestingTimeline: e.target.value }))}
              className="w-4 h-4 text-purple-600"
            />
            <span className="text-purple-700 font-medium">✅ Harvested</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="harvestingTimeline"
              value="other"
              checked={formData.harvestingTimeline === 'other'}
              onChange={(e) => setFormData(prev => ({ ...prev, harvestingTimeline: e.target.value }))}
              className="w-4 h-4 text-gray-600"
            />
            <span className="text-gray-700 font-medium">🔍 Other:</span>
          </label>
        </div>
        
        {formData.harvestingTimeline === 'other' && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Please specify other timeline:
            </label>
            <input
              type="text"
              value={formData.harvestingTimelineOther}
              onChange={(e) => setFormData(prev => ({ ...prev, harvestingTimelineOther: e.target.value }))}
              placeholder="Describe the harvesting timeline..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        )}
      </div>

      {/* Staff Feedback */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
          Staff Feedback *
        </h3>
        <p className="text-sm text-gray-600 mb-4">Select all that apply:</p>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.staffFeedback.includes('flies')}
              onChange={(e) => handleStaffFeedbackChange('flies', e.target.checked)}
              className="w-4 h-4 text-red-600"
            />
            <span className="text-gray-700 font-medium">🪰 Flies</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.staffFeedback.includes('smell-leachate')}
              onChange={(e) => handleStaffFeedbackChange('smell-leachate', e.target.checked)}
              className="w-4 h-4 text-orange-600"
            />
            <span className="text-gray-700 font-medium">👃 Smell / Leachate in Composters</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.staffFeedback.includes('damaged-units')}
              onChange={(e) => handleStaffFeedbackChange('damaged-units', e.target.checked)}
              className="w-4 h-4 text-red-600"
            />
            <span className="text-gray-700 font-medium">🔧 Damaged Units</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.staffFeedback.includes('collection-bin-issues')}
              onChange={(e) => handleStaffFeedbackChange('collection-bin-issues', e.target.checked)}
              className="w-4 h-4 text-yellow-600"
            />
            <span className="text-gray-700 font-medium">🗑️ Collection bin issues - Overloaded / Smell / More Moisture</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.staffFeedback.includes('compost-maker-issues')}
              onChange={(e) => handleStaffFeedbackChange('compost-maker-issues', e.target.checked)}
              className="w-4 h-4 text-purple-600"
            />
            <span className="text-gray-700 font-medium">🍄 Compost Maker Issues - Fungus / Moisture</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.staffFeedback.includes('storage-provision-okay')}
              onChange={(e) => handleStaffFeedbackChange('storage-provision-okay', e.target.checked)}
              className="w-4 h-4 text-green-600"
            />
            <span className="text-gray-700 font-medium">✅ Storage of Compost provision is okay</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.staffFeedback.includes('other')}
              onChange={(e) => handleStaffFeedbackChange('other', e.target.checked)}
              className="w-4 h-4 text-gray-600"
            />
            <span className="text-gray-700 font-medium">🔍 Other:</span>
          </label>
        </div>
        
        {formData.staffFeedback.includes('other') && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Please specify other feedback:
            </label>
            <textarea
              value={formData.staffFeedbackOther}
              onChange={(e) => setFormData(prev => ({ ...prev, staffFeedbackOther: e.target.value }))}
              rows={3}
              placeholder="Describe other issues or observations..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        )}
        
        {formData.staffFeedback.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-800 mb-2">Selected Feedback Items:</p>
            <div className="flex flex-wrap gap-2">
              {formData.staffFeedback.map((feedback, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {feedback === 'flies' ? '🪰 Flies' :
                   feedback === 'smell-leachate' ? '👃 Smell/Leachate' :
                   feedback === 'damaged-units' ? '🔧 Damaged Units' :
                   feedback === 'collection-bin-issues' ? '🗑️ Collection Bin Issues' :
                   feedback === 'compost-maker-issues' ? '🍄 Compost Maker Issues' :
                   feedback === 'storage-provision-okay' ? '✅ Storage Okay' :
                   feedback === 'other' ? '🔍 Other' : feedback}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Work Completion */}

      {/* Submit Button */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <button
          onClick={submitWorkReport}
          className="w-full py-4 px-6 rounded-lg text-lg font-bold flex items-center justify-center space-x-2 transition-colors bg-green-600 text-white hover:bg-green-700"
        >
          <Send className="h-6 w-6" />
          <span>Submit Work Report</span>
        </button>
        <p className="text-center text-sm text-gray-500 mt-2">
          Report will be submitted for supervisor review
        </p>
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && <QRScannerModal />}
    </div>
  );
};

export default StaffWorkForm;