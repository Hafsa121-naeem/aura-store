'use client';

import React, { useState } from 'react';
import { Review } from '@/lib/types/database';
import { createProductReview } from '@/lib/services/api';
import { formatDate } from '@/lib/utils';
import { Star, CheckCircle, MessageSquarePlus } from 'lucide-react';

interface ProductReviewsProps {
  productId: string;
  initialReviews: Review[];
}

export default function ProductReviews({ productId, initialReviews }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    try {
      const newReview = await createProductReview({
        product_id: productId,
        user_id: null,
        user_name: userName.trim(),
        rating,
        title: title.trim() || null,
        comment: comment.trim(),
      });

      setReviews([newReview, ...reviews]);
      setShowForm(false);
      setUserName('');
      setTitle('');
      setComment('');
      setRating(5);
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 5.0;

  return (
    <div className="mt-16 pt-12 border-t border-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Customer Reviews</h2>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center text-amber-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(avgRating) ? 'fill-current' : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-slate-900 font-bold">{avgRating.toFixed(1)} out of 5</span>
            <span className="text-slate-500 text-sm">
              Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors shadow-sm"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>{showForm ? 'Cancel Review' : 'Write a Review'}</span>
        </button>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Thank you! Your verified review has been published.</span>
        </div>
      )}

      {/* Review Submission Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 animate-in fade-in"
        >
          <h3 className="text-base font-bold text-slate-900">Share your experience</h3>

          {/* Star selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-amber-500 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating ? 'fill-current' : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs text-slate-600 font-medium ml-2">
                {rating === 5 ? '5 Stars - Exceptional' : `${rating} Stars`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Maya Lin"
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Review Headline
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Exceeded my expectations!"
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Detailed Comments *
            </label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you love about the build quality, feel, sound, or performance?"
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-xl text-sm transition-colors shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Post Review'}
            </button>
          </div>
        </form>
      )}

      {/* Review List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-slate-500 text-sm italic py-4">
            Be the first customer to leave a review for this product!
          </p>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{rev.user_name}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    Verified Purchase
                  </span>
                </div>
                <span className="text-xs text-slate-400">{formatDate(rev.created_at)}</span>
              </div>

              <div className="flex items-center text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= rev.rating ? 'fill-current' : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>

              {rev.title && (
                <h4 className="text-sm font-bold text-slate-900">{rev.title}</h4>
              )}

              <p className="text-sm text-slate-600 leading-relaxed">{rev.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
