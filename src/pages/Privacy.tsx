import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { motion } from 'motion/react';

export default function Privacy() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="w-16 h-16 bg-red-50 rounded-[28px] flex items-center justify-center text-[#E31837] mx-auto mb-6">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-5xl font-black tracking-tight mb-4 text-gray-900">Privacy Policy</h1>
        <p className="text-gray-500 font-medium">Your data security is our absolute priority at York University.</p>
      </motion.div>

      <div className="space-y-12">
        <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
            <Eye className="w-6 h-6 text-red-500" />
            Information Visibility
          </h2>
          <div className="prose prose-red text-gray-600 font-medium leading-relaxed max-w-none">
            <p className="mb-4">
              To ensure the security of lost items, we implement a strict <strong>Zero-Leak Policy</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-4">
              <li>Contact information (email/phone) is never visible to guest users or public crawlers.</li>
              <li>Only verified York University members signed in through our secure Google gateway can request contact details.</li>
              <li>Item locations are generalized to campus landmarks to prevent pinpointing of specific rooms or personal spaces.</li>
            </ul>
          </div>
        </section>

        <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
            <Shield className="w-6 h-6 text-emerald-500" />
            Data Protection
          </h2>
          <div className="prose prose-red text-gray-600 font-medium leading-relaxed max-w-none">
            <p>
              We use 256-bit encryption for all data storage. Your profile information is used exclusively for identity verification during high-value item handovers. We do not sell, share, or monetize any user data.
            </p>
          </div>
        </section>

        <section className="bg-red-50 p-10 rounded-[40px] border border-red-100">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-red-600" />
            Account Deletion
          </h2>
          <p className="text-gray-600 font-medium">
            Users can request total data erasure at any time. When an item is marked as resolved, all associated high-detail information is purged from the active grid immediately.
          </p>
        </section>
      </div>
    </main>
  );
}
