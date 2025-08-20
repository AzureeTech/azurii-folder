import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard'); // Redirect to admin dashboard
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No admin account found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        case 'auth/too-many-requests':
          setError('Account temporarily locked due to too many attempts');
          break;
        default:
          setError('Login failed. Please try again.');
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    setError('');
    setResetMessage('');

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage(`Password reset link sent to ${resetEmail}`);
      setResetEmail('');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
      console.error('Reset error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        {!showResetForm ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Admin Login</h2>
            {error && <div className="bg-red-900 text-red-300 p-3 mb-4 rounded">{error}</div>}
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-400 mb-2">Admin Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 bg-gray-700 rounded text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-400 mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-3 bg-gray-700 rounded text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded transition ${loading ? 'opacity-70' : ''}`}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <button 
                onClick={() => setShowResetForm(true)}
                className="text-blue-500 hover:text-blue-400 text-sm"
              >
                Forgot your password?
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Reset Password</h2>
            {resetMessage && <div className="bg-green-900 text-green-300 p-3 mb-4 rounded">{resetMessage}</div>}
            {error && <div className="bg-red-900 text-red-300 p-3 mb-4 rounded">{error}</div>}
            
            <form onSubmit={handlePasswordReset}>
              <div className="mb-4">
                <label htmlFor="reset-email" className="block text-gray-400 mb-2">Your Admin Email</label>
                <input
                  type="email"
                  id="reset-email"
                  className="w-full p-3 bg-gray-700 rounded text-white"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded transition ${loading ? 'opacity-70' : ''}`}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <button 
                onClick={() => {
                  setShowResetForm(false);
                  setError('');
                  setResetMessage('');
                }}
                className="text-blue-500 hover:text-blue-400 text-sm"
              >
                Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;