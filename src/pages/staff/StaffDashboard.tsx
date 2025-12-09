import React, { useState, useRef } from 'react';
import { 
  Camera, 
  MapPin, 
  CheckCircle, 
  Clock,
  LogOut,
  User,
  QrCode,
  X,
  Calendar,
  Send
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const StaffDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState('Getting location...');
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [currentWorkplace, setCurrentWorkplace] = useState('');
  const [attendanceTime, setAttendanceTime] = useState('');
  const [locationHistory, setLocationHistory] = useState<Array<{
    location: string;
    timestamp: string;
    coordinates: string;
  }>>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const todaysTasks = [
    {
      id: '1',
      time: '09:00 AM',
      location: 'Green Valley Apartments',
      address: '123 Green Valley Road',
      type: 'Check Composter',
      status: 'pending',
      qrCode: 'GV-001'
    },
    {
      id: '2',
      time: '11:30 AM',
      location: 'Nature Villa',
      address: '321 Nature Drive',
      type: 'Collect Waste',
      status: 'pending',
      qrCode: 'NN-005'
    },
    {
      id: '3',
      time: '02:00 PM',
      location: 'Sunrise Homes',
      address: '789 Sunrise Avenue',
      type: 'Fix Problem',
      status: 'pending',
      qrCode: 'SR-002'
    }
  ];

  const startQRScanner = async () => {
    setShowQRScanner(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Cannot access camera. Please allow camera permission.');
      setShowQRScanner(false);
    }
  };

  const stopQRScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setShowQRScanner(false);
  };

  const simulateQRScan = (qrCode: string) => {
    const timestamp = new Date().toISOString();
    const timeString = new Date().toLocaleTimeString();
    
    // Location mapping for different QR codes
    const locationMap: { [key: string]: string } = {
      'GV-001': 'Green Valley Apartments',
      'NN-005': 'Nature Villa',
      'SR-002': 'Sunrise Homes',
      'EG-003': 'Eco Gardens Complex',
      'WORKPLACE-001': 'StoneSoup Office',
      'WORKPLACE-002': 'North Zone Hub',
      'WORKPLACE-003': 'South Zone Hub',
      'WORKPLACE-004': 'Central Processing Unit'
    };

    const location = locationMap[qrCode] || 'Unknown Location';
    
    // Update location and mark attendance
    setAttendanceMarked(true);
    setCurrentWorkplace(location);
    setAttendanceTime(timeString);
    
    // Add to location history
    const newLocationEntry = {
      location: location,
      timestamp: timestamp,
      coordinates: currentLocation
    };
    
    setLocationHistory(prev => [newLocationEntry, ...prev]);
    
    stopQRScanner();
    
    // Show success message with timestamp
    alert(`✅ Location Updated!\n\nLocation: ${location}\nTime: ${timeString}\nCoordinates: ${currentLocation}\nQR Code: ${qrCode}`);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedPhotos(prev => [...prev, ...files]);
  };

  const removePhoto = (index: number) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Hello, {user?.name}</h1>
              <p className="text-gray-600">Field Staff</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Current Location & Time */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Current GPS Location</p>
              <p className="font-medium text-gray-800">{currentLocation}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Current Time</p>
              <p className="font-medium text-gray-800">{new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Scanner Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-2">📍 Update Location</h2>
          <p className="text-gray-600 mb-4">Scan QR code to update your current work location</p>
          <button
            onClick={startQRScanner}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold flex items-center space-x-2 mx-auto"
          >
            <QrCode className="h-6 w-6" />
            <span>Scan Location QR Code</span>
          </button>
        </div>
      </div>

      {/* Current Work Location */}
      {attendanceMarked && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-bold text-green-800">📍 Current Location: {currentWorkplace}</p>
              <p className="text-green-700">Updated at: {attendanceTime}</p>
              <p className="text-sm text-green-600">GPS: {currentLocation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Location History */}
      {locationHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-purple-500" />
            Today's Location History
          </h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {locationHistory.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{entry.location}</p>
                  <p className="text-sm text-gray-600">GPS: {entry.coordinates}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-sm mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Scan Location QR Code</h3>
              <button
                onClick={stopQRScanner}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 bg-black rounded-lg"
              />
              <canvas ref={canvasRef} className="hidden" />
              
              {/* QR Code overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-white rounded-lg opacity-50"></div>
              </div>
            </div>
            
            <p className="text-center text-gray-600 mt-4 text-sm">
              Point camera at location QR code to update your position
            </p>
            
            {/* Demo QR codes for different locations */}
            <div className="mt-4 space-y-2">
              <p className="text-xs text-gray-500 text-center">Demo Location QR Codes:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => simulateQRScan('WORKPLACE-001')}
                  className="bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm"
                >
                  Office
                </button>
                <button
                  onClick={() => simulateQRScan('GV-001')}
                  className="bg-green-100 text-green-700 px-3 py-2 rounded text-sm"
                >
                  Green Valley
                </button>
                <button
                  onClick={() => simulateQRScan('NN-005')}
                  className="bg-purple-100 text-purple-700 px-3 py-2 rounded text-sm"
                >
                  Nature Villa
                </button>
                <button
                  onClick={() => simulateQRScan('SR-002')}
                  className="bg-orange-100 text-orange-700 px-3 py-2 rounded text-sm"
                >
                  Sunrise Homes
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={() => simulateQRScan('WORKPLACE-002')}
                  className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded text-sm"
                >
                  North Hub
                </button>
                <button
                  onClick={() => simulateQRScan('WORKPLACE-003')}
                  className="bg-pink-100 text-pink-700 px-3 py-2 rounded text-sm"
                >
                  South Hub
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-3">
          <button 
            onClick={() => navigate('/work-form')}
            className="bg-green-600 text-white py-4 px-4 rounded-lg font-medium flex items-center justify-center space-x-2"
          >
            <Send className="h-5 w-5" />
            <span>📝 Submit Work Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;