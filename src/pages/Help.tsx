import { HelpCircle, MessageSquare, BookOpen, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Help() {
  const faqs = [
    {
      q: "How do I prove an item is mine?",
      a: "For high-value items, you must provide specific details not mentioned in the public report (e.g., serial numbers, wallpaper on phone, or unique identifying marks) to the admin or security officer."
    },
    {
      q: "What if the finder doesn't respond?",
      a: "Wait 48 hours. If there's no response, contact York Security with the Report ID. We track all registered users and can follow up internally if needed."
    },
    {
      q: "Can I report items found off-campus?",
      a: "YorkReturn is strictly for York University campus grounds including Keele and Glendon. Off-campus items should be reported to the Toronto Police Service."
    }
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="w-16 h-16 bg-red-50 rounded-[28px] flex items-center justify-center text-[#E31837] mx-auto mb-6">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-5xl font-black tracking-tight mb-4 text-gray-900">Help Center</h1>
        <p className="text-gray-500 font-medium">Everything you need to know about the YorkReturn platform.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="p-8 bg-white rounded-[40px] border border-gray-100 shadow-sm text-center">
          <BookOpen className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-black mb-2">Guides</h3>
          <p className="text-xs text-gray-400 font-medium">Step-by-step documentation for users.</p>
        </div>
        <div className="p-8 bg-white rounded-[40px] border border-gray-100 shadow-sm text-center">
          <MessageSquare className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-lg font-black mb-2">Support</h3>
          <p className="text-xs text-gray-400 font-medium">Chat with a campus admin.</p>
        </div>
        <div className="p-8 bg-white rounded-[40px] border border-gray-100 shadow-sm text-center">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-black mb-2">Reporting</h3>
          <p className="text-xs text-gray-400 font-medium">Flag suspicious activity.</p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-black mb-8 px-6">Frequently Asked Questions</h2>
        {faqs.map((faq, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm"
          >
            <h4 className="text-lg font-black mb-3 text-gray-900">{faq.q}</h4>
            <p className="text-gray-500 font-medium leading-relaxed">{faq.a}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
