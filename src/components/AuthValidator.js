import { useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthValidator = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("onAuthStateChanged triggered. User:", user);

      if (user) {
        try {
          const uid = user.uid.trim();
          console.log("Checking Firestore document for UID:", uid);

          const userDocRef = doc(db, 'users', uid);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            console.warn("User document not found for UID:", uid);
            await signOut(auth);
            toast.error('You are not an Admin. Please contact support.');
            navigate('/login');
            return;
          }

          const userData = userDoc.data();
          console.log("User document found:", userData);

          if (!userData.role || userData.role !== 'Admin') {
            console.warn("User role is not Admin:", userData.role);
            await signOut(auth);
            toast.error('You are not an Admin. Please contact support.');
            navigate('/login');
            return;
          }

          console.log("Access granted: User is an Admin.");
        } catch (err) {
          console.error("Error in AuthValidator:", err);
          await signOut(auth);
          toast.error('Authentication error. Try again.');
          navigate('/login');
        }
      } else {
        console.warn("No authenticated user found.");
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return <Outlet />; // ✅ Render nested route content
};

export default AuthValidator;
