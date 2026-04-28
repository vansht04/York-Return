import { ShieldAlert, CheckCircle2, MapPin, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';

export default function Safety() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="w-16 h-16 bg-red-50 rounded-[28px] flex items-center justify-center text-[#E31837] mx-auto mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-5xl font-black tracking-tight mb-4 text-gray-900">Safety Protocols</h1>
        <p className="text-gray-500 font-medium">Verified procedures for safe item recovery on campus.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black mb-4">Safe Meet Zones</h3>
          <p className="text-gray-600 font-medium leading-relaxed">
            If choosing a direct handover, we mandate meeting at one of these monitored locations:
          </p>
          <ul className="mt-4 space-y-2 text-sm font-bold text-gray-500 list-disc pl-5">
            <li>Vari Hall Rotunda (Main Entrance)</li>
            <li>Central Square Lobby</li>
            <li>Scott Library Entrance</li>
            <li>Lassonde Building Lobby</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black mb-4">Security Desk Drop</h3>
          <p className="text-gray-600 font-medium leading-relaxed">
            The most secure method. Hand the item to a York Security Officer and provide the report ID. The owner will need shown ID to pick it up.
          </p>
        </div>
      </div>

      <div className="bg-gray-900 text-white p-12 rounded-[60px] shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-6">Emergency Assistance</h2>
          <p className="text-xl opacity-80 mb-8 max-w-xl">If you ever feel unsafe during a transaction or encounter a suspicious report, contact York Security immediately.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
              <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">Non-Emergency</p>
              <div className="flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-red-400" />
                <span className="text-xl font-bold">416-650-8000</span>
              </div>
            </div>
            <div className="bg-red-500 p-6 rounded-3xl shadow-xl">
              <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">Urgent (Campus Phone)</p>
              <div className="flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-white" />
                <span className="text-xl font-bold">Ext. 33333</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
