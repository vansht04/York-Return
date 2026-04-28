import { motion } from 'motion/react';
import { Plus, LogIn, Sparkles, Shield } from 'lucide-react';
import { signInWithGoogle, auth } from '../lib/firebase';
import CampusMap from '../components/CampusMap';
import { Item } from '../types';

interface HomeProps {
  items: Item[];
  onReportClick: () => void;
}

export default function Home({ items, onReportClick }: HomeProps) {
  const user = auth.currentUser;

  return (
    <>
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 text-center md:text-left">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm mb-8"
              >
                <Sparkles className="w-4 h-4 text-[#E31837]" />
                <span className="text-xs font-black uppercase tracking-widest text-gray-500">Trusted by Yorkies</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[0.85] mb-8"
              >
                York's Most <span className="text-[#E31837]">Secure</span> Lost & Found.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg mb-10 mx-auto md:mx-0"
              >
                A verified safe-haven for your belongings. We bridge the gap between lost and found with security that actually works.
              </motion.p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <button
                  onClick={onReportClick}
                  className="w-full sm:w-auto px-10 py-5 bg-gray-900 text-white rounded-[32px] text-lg font-black tracking-tight hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4"
                >
                  <Plus className="w-6 h-6" />
                  Report Item
                </button>
                {!user && (
                  <button
                    onClick={signInWithGoogle}
                    className="w-full sm:w-auto px-10 py-5 bg-white text-gray-900 border border-gray-200 rounded-[32px] text-lg font-bold tracking-tight hover:bg-gray-50 transition-all flex items-center justify-center gap-4"
                  >
                    <LogIn className="w-6 h-6" />
                    Join Community
                  </button>
                )}
              </div>
            </div>

            {/* Visual Teaser */}
            {!user ? (
               <motion.div 
                initial={{ opacity: 0, rotate: 5 }}
                animate={{ opacity: 1, rotate: 0 }}
                className="flex-1 w-full max-w-sm hidden lg:block"
              >
                 <div className="bg-white p-10 rounded-[60px] border border-gray-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] relative">
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-500 rounded-[32px] flex items-center justify-center shadow-xl shadow-red-500/20 rotate-12">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black mb-4">Security first.</h3>
                    <p className="text-gray-400 font-medium leading-relaxed mb-8">Verification ensures only real York University students can browse and report belongings.</p>
                    <div className="space-y-4">
                      <div className="h-4 bg-gray-50 rounded-full w-full" />
                      <div className="h-4 bg-gray-50 rounded-full w-3/4" />
                      <div className="h-4 bg-red-50 rounded-full w-1/2" />
                    </div>
                 </div>
               </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 w-full max-w-lg hidden lg:block"
              >
                <div className="h-[400px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
                  <CampusMap items={items} />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-[#E31837]">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black">Verified Picking</h3>
            <p className="text-gray-500 text-sm font-medium">Items are only released after identity verification via student email.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black">Safe Meetings</h3>
            <p className="text-gray-500 text-sm font-medium">Coordinate safe handovers at designated campus security zones.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900">
              <Plus className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black">Admin Oversight</h3>
            <p className="text-gray-500 text-sm font-medium">Trained admins verify high-value reports before they go live.</p>
          </div>
        </div>
      </section>
    </>
  );
}
