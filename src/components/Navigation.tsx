import { useState, useEffect } from 'react';
import { auth, signInWithGoogle, logout } from '../lib/firebase';
import { User } from 'firebase/auth';
import { LogIn, LogOut, User as UserIcon, ShieldCheck, Map, Grid, Info, MessageSquareText, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation({ isAdmin }: { isAdmin?: boolean }) {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    return auth.onAuthStateChanged((u) => setUser(u));
  }, []);

  const NavLink = ({ to, children, icon: Icon }: { to: string; children: any; icon: any }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
          isActive 
            ? 'bg-red-50 text-[#E31837]' 
            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        <Icon className="w-4 h-4" />
        <span className="hidden md:inline">{children}</span>
      </Link>
    );
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-[#E31837] p-2.5 rounded-2xl shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <span className="font-black text-2xl tracking-tighter text-gray-900">YorkReturn</span>
          {isAdmin && (
            <span className="bg-gray-900 text-white text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest animate-pulse">Admin</span>
          )}
        </Link>

        <div className="hidden sm:flex items-center gap-2">
          <NavLink to="/" icon={Info}>Home</NavLink>
          <NavLink to="/browse" icon={Grid}>Browse</NavLink>
          <NavLink to="/map" icon={Map}>Campus Map</NavLink>
          <NavLink to="/testimonials" icon={MessageSquareText}>Feedback</NavLink>
          <NavLink to="/team" icon={Users}>Team</NavLink>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-sm font-black text-gray-900 tracking-tight leading-none mb-1">{user.displayName}</span>
                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Verified Yorkie</span>
              </div>
              <div className="w-px h-8 bg-gray-100 mx-2 hidden sm:block" />
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
              {user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-2xl border-2 border-white shadow-md" />
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center border-2 border-white shadow-md text-gray-400">
                  <UserIcon className="w-5 h-5" />
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-black tracking-tight hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/10 active:scale-95"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
