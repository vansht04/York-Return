import { useState } from 'react';
import { X, MapPin, Phone, User, Tag, Type, FileText, Send, Map, ShieldCheck, Crosshair, Search } from 'lucide-react';
import { auth, db, handleFirestoreError } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { ItemType, OperationType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import CampusMap from './CampusMap';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  'Electronics', 'Keys', 'Wallets/Bags', 'Clothing', 'Stationery', 'Documents', 'Water Bottles', 'Other'
];

export default function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const [type, setType] = useState<ItemType>('lost');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [phone, setPhone] = useState('');
  const [handoverMethod, setHandoverMethod] = useState<any>('security');
  const [securityLocation, setSecurityLocation] = useState('Central Square (Main)');
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    setIsSubmitting(true);
    const itemData = {
      type,
      title,
      description,
      location,
      category,
      status: 'active',
      reportedBy: auth.currentUser.uid,
      reporterName: auth.currentUser.displayName || 'Anonymous',
      createdAt: serverTimestamp(),
      latitude: locationCoords?.lat,
      longitude: locationCoords?.lng,
      handoverMethod,
      securityLocation: handoverMethod === 'direct' ? null : securityLocation
    };

    try {
      const docRef = await addDoc(collection(db, 'items'), itemData);
      
      // Save private contact info
      await setDoc(doc(db, 'items', docRef.id, 'private', 'contact'), {
        reporterPhone: phone,
        reporterEmail: auth.currentUser.email || 'N/A',
        reportedBy: auth.currentUser.uid
      });

      onClose();
      // Reset form
      setTitle('');
      setDescription('');
      setLocation('');
      setPhone('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'items');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-xl rounded-[40px] overflow-hidden shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="p-8 md:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
          <header className="mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Report an Item</h2>
            <p className="text-gray-500 font-medium">Help the York community stay connected.</p>
          </header>

          <div className="space-y-6">
            {/* Toggle Lost/Found */}
            <div className="flex p-1 bg-gray-100 rounded-3xl">
              <button
                type="button"
                onClick={() => setType('lost')}
                className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all ${
                  type === 'lost' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                I Lost Something
              </button>
              <button
                type="button"
                onClick={() => setType('found')}
                className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all ${
                  type === 'found' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                I Found Something
              </button>
            </div>

            {type === 'found' && (
              <div className="bg-emerald-50/50 p-6 rounded-[32px] border border-emerald-100/50 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-emerald-600">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                  <span className="text-xs font-black uppercase tracking-tight">Enterprise Security Protocol</span>
                </div>
                <p className="text-[11px] text-emerald-800 font-medium leading-relaxed">
                  To ensure a secure handover, we recommend using your <strong className="font-extrabold underline">@yorku.ca</strong> or <strong className="font-extrabold underline">@my.yorku.ca</strong> email. This increases trust and allows security officers to verify your identity.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-emerald-600/60 font-bold bg-white/50 p-2 rounded-xl border border-emerald-100">
                  <Search className="w-3.5 h-3.5" />
                  <span>Tip: Search "Browse" first to see if this item is already reported as lost!</span>
                </div>
              </div>
            )}

            {/* Title */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">What did you {type === 'lost' ? 'lose' : 'find'}?</label>
              <div className="relative group">
                <Type className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Silver iPhone 13, Blue Backpack"
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-3xl outline-none transition-all font-semibold"
                />
              </div>
            </div>

            {/* Category & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Category</label>
                <div className="relative group">
                  <Tag className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-3xl outline-none transition-all font-semibold appearance-none"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Location</label>
                <div className="relative group">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  <input
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Scott Library, 2nd floor"
                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-3xl outline-none transition-all font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Details</label>
              <div className="relative group">
                <FileText className="absolute left-6 top-6 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Any identifying features? (Unique stickers, case, distinct mark...)"
                  rows={4}
                  className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-3xl outline-none transition-all font-semibold resize-none"
                />
              </div>
            </div>

            {/* Map Picker */}
            <div className="space-y-4">
               <div className="flex items-center justify-between ml-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pin on Campus Map (Optional)</label>
                  {locationCoords && (
                    <div className="flex items-center gap-1">
                      <Crosshair className="w-3 h-3 text-red-500" />
                      <span className="text-[9px] font-bold text-red-500 uppercase tracking-tight">Location Pinned</span>
                    </div>
                  )}
              </div>
              <div className="h-64 rounded-3xl overflow-hidden border-2 border-gray-100 shadow-inner">
                <CampusMap onLocationSelect={(lat, lng) => setLocationCoords({ lat, lng })} interactive={true} />
              </div>
              <p className="text-[9px] font-medium text-gray-400 text-center px-4 italic">Click the map where the item was lost/found to help others find it faster.</p>
            </div>

            {/* Handover Preference (only for found items) */}
            {type === 'found' && (
              <div className="space-y-4 p-6 bg-red-50 rounded-[32px] border border-red-100 shadow-sm shadow-red-500/5">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-6 h-6 text-[#E31837]" />
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">Handover Preference</h4>
                </div>
                
                <p className="text-[10px] text-gray-500 font-medium px-2 mb-4 leading-relaxed italic">
                  Choose how you want to return this item. YorkReturn prioritizes safety and verification for both parties.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setHandoverMethod('security')}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${
                      handoverMethod === 'security' 
                        ? 'border-[#E31837] bg-white shadow-md' 
                        : 'border-transparent bg-white/50 text-gray-500 hover:bg-white'
                    }`}
                  >
                    <p className="text-xs font-black mb-1 leading-none uppercase tracking-widest text-[#E31837]">Security Desk</p>
                    <p className="text-[9px] font-bold opacity-60">I'll drop it off at a campus security hub.</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHandoverMethod('direct')}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${
                      handoverMethod === 'direct' 
                        ? 'border-gray-900 bg-white shadow-md' 
                        : 'border-transparent bg-white/50 text-gray-500 hover:bg-white'
                    }`}
                  >
                    <p className="text-xs font-black mb-1 leading-none uppercase tracking-widest text-gray-900">Safe-Meet</p>
                    <p className="text-[9px] font-bold opacity-60">I'll meet the owner at a safe zone.</p>
                  </button>
                </div>

                {handoverMethod === 'security' && (
                  <div className="space-y-2 mt-4 animate-in fade-in slide-in-from-top-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Selected Deposit Location</label>
                    <select
                      value={securityLocation}
                      onChange={(e) => setSecurityLocation(e.target.value)}
                      className="w-full px-6 py-4 bg-white border-2 border-transparent focus:border-red-500 rounded-[20px] outline-none transition-all font-bold appearance-none text-sm text-gray-700 shadow-sm"
                    >
                      <option>Central Square (Main Desk)</option>
                      <option>William Small Centre</option>
                      <option>Curtis Lecture Halls</option>
                      <option>Glendon Hall (Main)</option>
                      <option>Other / Specified in Details</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* Contact Security */}
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Your Phone Number</label>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-tight">Verified Community Only</span>
                </div>
              </div>
              <div className="relative group">
                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +1 (416) 123-4567"
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-3xl outline-none transition-all font-semibold"
                />
              </div>
            </div>

            <button
              disabled={isSubmitting}
              className="w-full py-5 bg-[#E31837] text-white rounded-[32px] text-lg font-black tracking-tight hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 shadow-xl shadow-red-500/20 mt-4"
              id="submit-report-btn"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  Submit Report
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
