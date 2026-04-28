import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { db, auth, handleFirestoreError } from './lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { Item, OperationType } from './types';

// Components
import Navigation from './components/Navigation';
import ReportModal from './components/ReportModal';
import CookieConsent from './components/CookieConsent';

// Pages
import Home from './pages/Home';
import Browse from './pages/Browse';
import MapView from './pages/MapView';
import Testimonials from './pages/Testimonials';
import Privacy from './pages/Privacy';
import Safety from './pages/Safety';
import Help from './pages/Help';
import Team from './pages/Team';

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(auth.currentUser);
  const [isAdmin, setIsAdmin] = useState(false);

  const ADMIN_EMAILS = ['dalle2email@gmail.com'];

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user && user.email) {
        // Checking hardcoded list for easy access
        setIsAdmin(ADMIN_EMAILS.includes(user.email));
      } else {
        setIsAdmin(false);
      }
    });

    const q = query(collection(db, 'items'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toMillis() || Date.now()
      })) as Item[];
      setItems(newItems);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'items');
    });

    return () => {
      unsubscribeAuth();
      unsubscribe();
    };
  }, []);

  const handleResolve = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'items', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `items/${id}`);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('WARNING: This will permanently delete EVERY report in the database. Continue?')) return;
    try {
      for (const item of items) {
        await deleteDoc(doc(db, 'items', item.id));
      }
      alert('Success: Database cleared.');
    } catch (error) {
      alert('Error: Could not clear database.');
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans selection:bg-red-100 selection:text-[#E31837] overflow-x-hidden">
        <Navigation isAdmin={isAdmin} />

        <Routes>
          <Route path="/" element={<Home items={items} onReportClick={() => setIsReportModalOpen(true)} />} />
          <Route path="/browse" element={
            <Browse 
              items={items} 
              loading={loading} 
              isAdmin={isAdmin} 
              onResolve={handleResolve} 
              onReset={handleReset}
              onReportClick={() => setIsReportModalOpen(true)} 
            />
          } />
          <Route path="/map" element={<MapView items={items} />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/help" element={<Help />} />
          <Route path="/team" element={<Team />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <footer className="max-w-6xl mx-auto px-4 py-32 text-center border-t border-gray-100 mt-24">
          <div className="flex items-center justify-center gap-2 mb-12 opacity-20 hover:opacity-100 transition-opacity duration-700">
             <span className="text-4xl font-black tracking-tighter italic grayscale">YORK UNIVERSITY</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
            <Link to="/safety" className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-[#E31837] transition-colors">Safety Protocols</Link>
            <Link to="/privacy" className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-[#E31837] transition-colors">Privacy Policy</Link>
            <Link to="/map" className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-[#E31837] transition-colors">Campus Maps</Link>
            <Link to="/help" className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-[#E31837] transition-colors">Help Center</Link>
            <Link to="/team" className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-[#E31837] transition-colors">Meet the Team</Link>
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest opacity-50">
            YorkReturn &copy; 2026 • Secure Campus Infrastructure • Keele Campus
          </p>
        </footer>

        <ReportModal 
          isOpen={isReportModalOpen} 
          onClose={() => setIsReportModalOpen(false)} 
        />
        
        <CookieConsent />
      </div>
    </Router>
  );
}
