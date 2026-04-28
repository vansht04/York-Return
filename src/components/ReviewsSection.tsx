import { useState, useEffect } from 'react';
import { db, auth, handleFirestoreError } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Review, OperationType } from '../types';
import { Star, Send, MessageSquareText, User as UserIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const FEATURED_REVIEWS: Review[] = [
    {
      id: 'f1',
      authorName: 'York Student',
      rating: 5,
      comment: "Found my keys in Scott Library within 2 hours! This platform is exactly what we needed.",
      isFeatured: true,
      authorId: 'system',
      createdAt: Date.now()
    },
    {
      id: 'f2',
      authorName: 'Verified Member',
      rating: 5,
      comment: "The security desk drop-off is brilliant. Felt much safer than meeting a stranger elsewhere.",
      isFeatured: true,
      authorId: 'system',
      createdAt: Date.now()
    },
    {
      id: 'f3',
      authorName: 'Campus Faculty',
      rating: 5,
      comment: "A reliable system for staff and students alike. Very secure and well-designed.",
      isFeatured: true,
      authorId: 'system',
      createdAt: Date.now()
    }
  ];

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newReviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toMillis() || Date.now()
      })) as Review[];
      setReviews(newReviews);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'reviews');
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!auth.currentUser || !comment.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        rating,
        comment,
        authorName: auth.currentUser.displayName || 'York Student',
        authorId: auth.currentUser.uid,
        createdAt: serverTimestamp()
      });
      setComment('');
      setRating(5);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'reviews');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Review Form */}
        <div className="flex-1">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/50">
            <h3 className="text-2xl font-black mb-2 tracking-tight">Community Voice</h3>
            <p className="text-gray-400 text-sm font-medium mb-8">How's your experience with YorkReturn?</p>

            {auth.currentUser ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-1.5 ml-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHoveredRating(s)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform active:scale-90"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          s <= (hoveredRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-200'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-xs font-black text-gray-400 uppercase tracking-widest">{rating}/5 Stars</span>
                </div>

                <div className="relative">
                  <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell the community how we helped..."
                    rows={3}
                    className="w-full p-6 bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-3xl outline-none transition-all font-semibold resize-none"
                  />
                  <div className="absolute bottom-4 right-4">
                    <button
                      disabled={isSubmitting || !comment.trim()}
                      className="p-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="p-8 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-center">
                <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest italic">Sign in to leave a review</p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews List */}
        <div className="flex-1 space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-4">
          <AnimatePresence mode="popLayout">
            {[...FEATURED_REVIEWS, ...reviews].map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`bg-white p-6 rounded-[32px] border ${review.isFeatured ? 'border-[#E31837]/20 shadow-lg shadow-red-500/5' : 'border-gray-100'} shadow-sm flex gap-4`}
              >
                <div className={`w-10 h-10 rounded-full ${review.isFeatured ? 'bg-red-50' : 'bg-gray-100'} flex items-center justify-center shrink-0 border ${review.isFeatured ? 'border-red-100' : 'border-gray-200'}`}>
                  {review.isFeatured ? <Sparkles className="w-5 h-5 text-[#E31837]" /> : <UserIcon className="w-5 h-5 text-gray-400" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900">{review.authorName}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest leading-none px-2 py-0.5 rounded-full border ${review.isFeatured ? 'bg-red-50 text-[#E31837] border-red-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                      {review.isFeatured ? 'Verified Success' : 'York Member'}
                    </span>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {reviews.length === 0 && (
            <div className="text-center py-12 opacity-30 italic font-medium text-gray-400">
              No community reviews yet. Be the first!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
