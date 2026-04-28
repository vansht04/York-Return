import { motion } from 'motion/react';
import { MapPin, Crosshair } from 'lucide-react';
import CampusMap from '../components/CampusMap';
import { Item } from '../types';

interface MapViewProps {
  items: Item[];
}

export default function MapView({ items }: MapViewProps) {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-[28px] flex items-center justify-center text-[#E31837] mx-auto mb-6">
          <MapPin className="w-8 h-8" />
        </div>
        <h1 className="text-5xl font-black tracking-tight mb-4">Interactive Campus Grid</h1>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto">
          Pinpoint precisely where items were last seen. Use the high-resolution satellite imagery to identify specific campus zones.
        </p>
      </header>

      <div className="relative">
        <div className="h-[700px] rounded-[60px] overflow-hidden shadow-[0_48px_96px_-24px_rgba(0,0,0,0.2)] border-8 border-white bg-white">
          <CampusMap items={items} />
        </div>

        {/* Floating Side Info */}
        <div className="absolute bottom-12 left-12 z-20 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900/90 backdrop-blur-md px-6 py-4 rounded-[32px] border border-white/20 text-white shadow-2xl"
          >
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 leading-none mb-2">Live Grid Status</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-bold">
                 <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                 {items.filter(i => i.type === 'lost' && i.status === 'active').length} Lost
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2 text-sm font-bold">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                 {items.filter(i => i.type === 'found' && i.status === 'active').length} Found
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 flex items-start gap-6">
          <div className="w-14 h-14 bg-blue-50 rounded-[20px] flex items-center justify-center shrink-0">
             <Crosshair className="w-7 h-7 text-blue-500" />
          </div>
          <div>
            <h4 className="text-lg font-black mb-2 text-gray-900">Precision Pinning</h4>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">Our map uses high-precision coordinates to ensure accuracy within 2 meters of the reported location.</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 flex items-start gap-6">
          <div className="w-14 h-14 bg-amber-50 rounded-[20px] flex items-center justify-center shrink-0">
             <MapPin className="w-7 h-7 text-amber-500" />
          </div>
          <div>
            <h4 className="text-lg font-black mb-2 text-gray-900">Privacy First</h4>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">Exact household addresses are never shown. Only general campus landmarks and buildings are referenced.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
