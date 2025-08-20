import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setIsAdmin(userDoc.exists() && userDoc.data().role === 'Admin');
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (isAdmin === null) return <div>Loading...</div>;
  return isAdmin ? children : <Navigate to="/admin/login" />;
};