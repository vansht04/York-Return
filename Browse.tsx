import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, HelpCircle, Shield, Plus } from 'lucide-react';
import { Item } from '../types';
import ItemCard from '../components/ItemCard';
import { auth, signInWithGoogle } from '../lib/firebase';

interface BrowseProps {
  items: Item[];
  loading: boolean;
  isAdmin: boolean;
  onResolve: (id: string) => void;
  onReset: () => void;
  onReportClick: () => void;
}

export default function Browse({ items, loading, isAdmin, onResolve, onReset, onReportClick }: BrowseProps) {
  const [filterType, setFilterType] = useState<'all' | 'lost' | 'found'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const user = auth.currentUser;

  const filteredItems = items.filter(item => {
    const matchesFilter = filterType === 'all' || item.type === filterType;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-black tracking-tight mb-4 text-gray-900">Browse Infrastructure</h1>
        <p className="text-gray-500 font-medium">Explore active reports across Keele and Glendon campus grids.</p>
      </header>

      {/* Verification Alert for Guests */}
      <AnimatePresence>
        {!user && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mb-12"
          >
            <div className="bg-[#E31837] text-white p-8 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-red-500/20">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-[32px] flex items-center justify-center">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">Access Secure Details</h3>
                  <p className="opacity-80 font-medium">To see phone numbers or library lockers, you must verify your account.</p>
                </div>
              </div>
              <button
                onClick={signInWithGoogle}
                className="px-8 py-4 bg-white text-[#E31837] rounded-full font-black hover:bg-gray-100 transition-all shadow-xl"
              >
                Verify Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center bg-white p-4 rounded-[40px] border border-gray-100 shadow-sm relative">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search items, buildings, dorms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#E31837] focus:bg-white rounded-[32px] outline-none transition-all font-semibold"
          />
        </div>
        <div className="flex p-1 bg-gray-100 rounded-[32px] shrink-0">
           <button
            onClick={() => setFilterType('all')}
            className={`px-8 py-4 rounded-[28px] text-sm font-black tracking-tight transition-all ${
              filterType === 'all' ? 'bg-white text-gray-900 shadow-md' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setFilterType('lost')}
            className={`px-8 py-4 rounded-[28px] text-sm font-black tracking-tight transition-all ${
              filterType === 'lost' ? 'bg-white text-red-500 shadow-md' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            Lost
          </button>
          <button
            onClick={() => setFilterType('found')}
            className={`px-8 py-4 rounded-[28px] text-sm font-black tracking-tight transition-all ${
              filterType === 'found' ? 'bg-white text-emerald-500 shadow-md' : 'text-gray-400 hover:text-emerald-500'
            }`}
          >
            Found
          </button>
        </div>
        {isAdmin && items.length > 0 && (
          <button
            onClick={onReset}
            className="px-6 py-4 bg-gray-900 text-white rounded-[28px] text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-colors shadow-lg"
          >
            Emergency Reset
          </button>
        )}
      </div>

      {/* Results Grid - Bento Style */}
      {loading ? (
        <div className="py-24 text-center">
           <div className="w-12 h-12 border-4 border-gray-200 border-t-[#E31837] rounded-full animate-spin mx-auto mb-4" />
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Syncing with York Campus...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-32 text-center bg-white rounded-[40px] border-2 border-dashed border-gray-100">
          <HelpCircle className="w-16 h-16 text-gray-100 mx-auto mb-6" />
          <h3 className="text-2xl font-black text-gray-400">Nothing here yet</h3>
          <p className="text-gray-300 font-medium">Try checking another category or refining your search.</p>
          <button
            onClick={onReportClick}
            className="mt-8 px-8 py-4 bg-gray-900 text-white rounded-full font-bold flex items-center gap-2 mx-auto"
          >
            <Plus className="w-4 h-4" />
            Report Something
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
           <AnimatePresence mode="popLayout">
              {filteredItems.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  isOwner={user?.uid === item.reportedBy}
                  isAdmin={isAdmin}
                  onResolve={onResolve}
                />
              ))}
           </AnimatePresence>
        </div>
      )}
    </main>
  );
}
