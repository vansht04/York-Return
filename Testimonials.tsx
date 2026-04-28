import { MessageSquareText, Star, Sparkles, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import ReviewsSection from '../components/ReviewsSection';

export default function Testimonials() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-16 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-[28px] flex items-center justify-center text-[#E31837] mx-auto mb-6">
          <MessageSquareText className="w-8 h-8" />
        </div>
        <h1 className="text-5xl font-black tracking-tight mb-4">Community Feedback</h1>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto">
          Real success stories from York University students, faculty, and staff.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
        <div className="lg:col-span-2">
           <ReviewsSection />
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
            <Quote className="absolute top-4 right-4 w-12 h-12 text-white/10" />
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Verified Impact
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-3xl font-black text-red-500">98%</p>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-60">Recovery Rate</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-emerald-500">2hr</p>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-60">Avg. Response Time</p>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm font-medium leading-relaxed opacity-80 italic">
                    "This system transformed how we handle lost property. The integration with York Security ensures every handover is recorded and safe."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100">
             <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h4 className="text-lg font-black mb-2">Campus Standard</h4>
            <p className="text-gray-500 text-sm font-medium">The official unofficial way to get your stuff back at York.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
