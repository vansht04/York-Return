import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, CheckCircle2, Phone, Mail, User, Tag, Lock, Shield } from 'lucide-react';
import { Item, OperationType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth, handleFirestoreError } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface ItemCardProps {
  item: Item;
  onResolve?: (id: string) => void;
  isOwner: boolean;
  isAdmin: boolean;
  key?: string;
}

export default function ItemCard({ item, onResolve, isOwner, isAdmin }: ItemCardProps) {
  const [showContact, setShowContact] = useState(false);
  const [contactInfo, setContactInfo] = useState<{ phone: string, email: string } | null>(null);
  const [loadingContact, setLoadingContact] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContact = async () => {
    if (contactInfo) {
      setShowContact(!showContact);
      return;
    }

    if (!auth.currentUser) {
      setError("Please sign in to view contact details.");
      setShowContact(true);
      return;
    }

    setLoadingContact(true);
    setError(null);
    try {
      const contactDoc = await getDoc(doc(db, 'items', item.id, 'private', 'contact'));
      if (contactDoc.exists()) {
        const data = contactDoc.data();
        setContactInfo({
          phone: data.reporterPhone,
          email: data.reporterEmail
        });
        setShowContact(true);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, `items/${item.id}/private/contact`);
      setError("Unable to reveal info.");
    } finally {
      setLoadingContact(false);
    }
  };

  const redactEmail = (email: string) => {
    const [name, domain] = email.split('@');
    return `${name[0]}...${name[name.length - 1]}@${domain}`;
  };

  const redactPhone = (phone: string) => {
    return `${phone.slice(0, 3)}****${phone.slice(-3)}`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`bg-white rounded-[32px] p-6 border ${
        item.type === 'lost' ? 'border-red-100' : 'border-emerald-100'
      } shadow-sm hover:shadow-xl transition-all relative overflow-hidden group`}
      id={`item-${item.id}`}
    >
      <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest ${
        item.type === 'lost' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
      }`}>
        {item.type}
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 py-0.5 bg-gray-50 rounded-full border border-gray-100">
              {item.category}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-[#E31837] transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Handover Badge */}
        {item.type === 'found' && item.handoverMethod && (
          <div className={`p-3 rounded-2xl border text-[10px] font-bold uppercase tracking-tight ${
            item.handoverMethod === 'security' 
              ? 'bg-blue-50 border-blue-100 text-blue-600' 
              : 'bg-amber-50 border-amber-100 text-amber-600'
          }`}>
            <span className="opacity-60 block text-[8px] mb-0.5">Secure Pickup Mode</span>
            {item.handoverMethod === 'security' 
              ? `Drop-off: ${item.securityLocation}` 
              : 'Direct Meeting (Safe Zone)'}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          {isAdmin && item.status === 'active' && (
            <button
              onClick={() => onResolve?.(item.id)}
              className="w-full py-2.5 bg-[#E31837] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
              id={`resolve-btn-${item.id}`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Verify & Resolve
            </button>
          )}

          {!isAdmin && item.status === 'active' && (
             <button
               onClick={fetchContact}
               disabled={loadingContact}
               className={`w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                 showContact 
                   ? 'bg-gray-100 text-gray-900 border border-gray-200' 
                   : 'bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white shadow-lg shadow-gray-900/5'
               }`}
               id={`contact-btn-${item.id}`}
             >
               {loadingContact ? (
                 <div className="w-3 h-3 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
               ) : showContact ? (
                 'Close Secure View'
               ) : (
                 <>
                   <Lock className="w-3.5 h-3.5" />
                   Start Secure Retrieval
                 </>
               )}
             </button>
           )}

           <AnimatePresence>
             {showContact && (
               <motion.div
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: 'auto', opacity: 1 }}
                 exit={{ height: 0, opacity: 0 }}
                 className="overflow-hidden"
               >
                 <div className="mt-4 p-6 bg-red-50 rounded-[32px] border border-red-100 space-y-5">
                   {error ? (
                     <div className="text-center py-2">
                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest leading-relaxed">{error}</p>
                     </div>
                   ) : contactInfo ? (
                     <>
                       <div className="p-4 bg-white rounded-2xl border border-red-200 shadow-sm">
                         <div className="flex items-center gap-2 mb-2">
                           <Shield className="w-4 h-4 text-red-500" />
                           <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest leading-none">Security Instructions</p>
                         </div>
                         <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                           {item.handoverMethod === 'security' 
                             ? `This item has been deposited at ${item.securityLocation}. You MUST present a valid York University Student ID to the security desk officer to claim.`
                             : `A Safe-Meet has been authorized. Coordinate with the reporter below. Only meet in designated York Security zones (Vari Hall or Central Square).`}
                         </p>
                       </div>

                       <div className="bg-white/50 p-4 rounded-2xl border border-red-100 space-y-4">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                             <User className="w-4 h-4 text-red-600" />
                           </div>
                           <div>
                             <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest leading-none mb-0.5">Verified Reporter</p>
                             <p className="text-xs font-bold text-gray-900">{item.reporterName}</p>
                           </div>
                         </div>
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                             <Mail className="w-4 h-4 text-red-600" />
                           </div>
                           <div>
                             <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest leading-none mb-0.5">York Member Email</p>
                             <p className="text-xs font-bold text-gray-900">{contactInfo.email}</p>
                           </div>
                         </div>
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                             <Phone className="w-4 h-4 text-red-600" />
                           </div>
                           <div>
                             <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest leading-none mb-0.5">Contact Number</p>
                             <p className="text-xs font-black text-[#E31837] tracking-tight">{contactInfo.phone}</p>
                           </div>
                         </div>
                       </div>

                       <div className="pt-2 text-center">
                         <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 leading-none">Security Warning</p>
                         <p className="text-[8px] text-red-400 font-medium">Contact information is partially redacted for safety. Full details will be revealed by a York Admin upon proof of ownership.</p>
                       </div>
                     </>
                   ) : null}
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>

      {item.status === 'resolved' && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex items-center justify-center z-10">
          <div className="bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500 w-4 h-4" />
            <span className="text-xs font-bold text-gray-900 uppercase tracking-widest text-[10px]">Found / Resolved</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
