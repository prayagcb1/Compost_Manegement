import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Recycle, Eye, EyeOff, MapPin, QrCode } from 'lucide-react';
import toast from 'react-hot-toast';

const StaffLoginForm = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState('Getting location...');
  const [showQRLogin, setShowQRLogin] = useState(false);
  const { login } = useAuth();

  // Get location on component mount
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        },
        () => {
          setLocation('Location not available');
        }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Handle multiple login formats for raj
    let email = '';
    
    if (phone === '9876543210' || phone.toLowerCase() === 'raj' || phone === 'raj') {
      email = 'raj@stonesoup.com';
    } else if (phone === '9876543211' || phone.toLowerCase() === 'amit' || phone === 'amit') {
      email = 'amit@stonesoup.com';
    }
    
    if (!email) {
      toast.error('Invalid login. Try: "raj" (password: password)');
      setIsLoading(false);
      return;
    }

    const success = await login(email, password);
    
    if (!success) {
      toast.error('Wrong password. Try: password');
    }
    
    setIsLoading(false);
  };

  const handleQRLogin = (staffCode: string) => {
    setIsLoading(true);
    
    // Simulate QR code login
    const staffMap: { [key: string]: string } = {
      'STAFF-RAJ-001': 'raj@stonesoup.com',
      'STAFF-AMIT-002': 'amit@stonesoup.com'
    };
    
    const email = staffMap[staffCode];
    if (email) {
      login(email, 'password').then(success => {
        if (success) {
          toast.success(`Welcome! Logged in via QR code`);
        } else {
          toast.error('Login failed');
        }
        setIsLoading(false);
      });
    } else {
      toast.error('Invalid QR code');
      setIsLoading(false);
    }
  };

  const quickLogin = (phoneNum: string) => {
    setPhone(phoneNum);
    setPassword('password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-green-600 p-3 rounded-full">
              <Recycle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">StoneSoup</h1>
          <p className="text-green-600 font-medium">Staff Login</p>
        </div>

        {/* Location Display */}
        <div className="bg-blue-50 p-3 rounded-lg mb-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-xs text-blue-600">Your Location</p>
              <p className="text-sm font-medium text-blue-800">{location}</p>
            </div>
          </div>
        </div>

        {/* Login Method Toggle */}
        <div className="flex mb-6">
          <button
            onClick={() => setShowQRLogin(false)}
            className={`flex-1 py-2 px-4 rounded-l-lg font-medium ${
              !showQRLogin 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Phone Login
          </button>
          <button
            onClick={() => setShowQRLogin(true)}
            className={`flex-1 py-2 px-4 rounded-r-lg font-medium ${
              showQRLogin 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            QR Login
          </button>
        </div>

        {!showQRLogin ? (
          // Phone Login Form
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number or Staff ID
              </label>
              <input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter 'raj' or phone number"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          // QR Code Login
          <div className="text-center">
            <div className="bg-gray-100 p-8 rounded-lg mb-4">
              <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Scan your staff QR code to login instantly</p>
              <p className="text-sm text-gray-500">QR code should be provided by your supervisor</p>
            </div>
            
            {/* Demo QR Login Buttons */}
            <div className="space-y-2">
              <p className="text-xs text-gray-500 mb-2">Demo QR Codes:</p>
              <button
                onClick={() => handleQRLogin('STAFF-RAJ-001')}
                className="w-full bg-blue-100 text-blue-800 py-2 px-4 rounded-lg font-medium hover:bg-blue-200"
                disabled={isLoading}
              >
                Raj Kumar QR
              </button>
              <button
                onClick={() => handleQRLogin('STAFF-AMIT-002')}
                className="w-full bg-purple-100 text-purple-800 py-2 px-4 rounded-lg font-medium hover:bg-purple-200"
                disabled={isLoading}
              >
                Amit Singh QR
              </button>
            </div>
          </div>
        )}

        {!showQRLogin && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-3 font-medium">Quick Login (Demo):</p>
            <div className="space-y-2">
              <button
                onClick={() => { setPhone('raj'); setPassword('password'); }}
                className="w-full text-left p-2 bg-white border border-gray-200 rounded text-sm hover:bg-gray-50"
              >
                <div className="font-medium">Raj Kumar</div>
                <div className="text-gray-500">Login: raj</div>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Password for all: password</p>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800 font-medium">📱 How it works:</p>
          <p className="text-xs text-yellow-700 mt-1">
            1. Scan workplace QR → Auto attendance<br/>
            2. Fill work details → Take photos<br/>
            3. Submit → Done!
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffLoginForm;