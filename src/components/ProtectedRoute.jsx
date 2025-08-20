import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const ProtectedRoute = ({ children }) => {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/admin/login');
        return;
      }

      // Verify admin status
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      if (!adminDoc.exists() || !adminDoc.data().isAdmin) {
        await auth.signOut();
        navigate('/admin/login');
      }
    });

    return () => unsubscribe();
  }, []);

  return auth.currentUser ? children : null;
};

export default ProtectedRoute;