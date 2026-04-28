import { useState, useEffect } from 'react';
import { Shield, X, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('york-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('york-cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-2xl"
        >
          <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-[24px] bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
              <Shield className="w-8 h-8 text-red-500" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-white font-black text-xl tracking-tight mb-1">Your Privacy at York University</h4>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                We use cookies to secure your data and help you find lost items. By using YorkReturn, you agree to our campus safety protocols.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={accept}
                className="flex-1 md:flex-none px-8 py-4 bg-white text-gray-900 rounded-full text-sm font-black tracking-tight hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
              >
                Accept & Secure
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-4 bg-white/5 text-gray-400 rounded-full hover:bg-white/10 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
