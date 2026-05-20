// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { Heart, X, Loader2, CheckCircle } from 'lucide-react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const InterestModal = ({ product, onClose }) => {
  const [form, setForm] = useState({ name: '', mobile: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/api/customers`, {
        name: form.name,
        mobile: form.mobile,
        address: form.address,
        productName: product.title || product.name,
        productId: product._id || product.id,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting interest:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-indigo-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Success State */
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="w-9 h-9 text-green-500" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">We Got It! 🎉</h2>
            <p className="text-gray-600 mb-1 text-base leading-relaxed">
              Thank you for your interest in
            </p>
            <p className="text-indigo-700 font-bold text-lg mb-4">
              {product.title || product.name}
            </p>
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-4 text-indigo-800 font-semibold text-base">
              ⏰ We will contact you within <span className="text-indigo-600">24 hours</span>!
            </div>
            <button
              onClick={onClose}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-8 rounded-lg transition duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          /* Form State */
          <>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <Heart className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-gray-900">I'm Interested</h2>
                <p className="text-sm text-indigo-600 font-medium truncate max-w-[220px]">
                  {product.title || product.name}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
                <input
                  required
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="e.g. +91 98765 43210"
                  pattern="[0-9+\s\-]{7,15}"
                  title="Enter a valid mobile number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                <textarea
                  required
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Your full address..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center font-bold py-3 rounded-lg text-white text-base transition duration-300 shadow-md ${
                  loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02]'
                }`}
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</>
                ) : (
                  'Submit Interest'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const ProductCard = ({ product, navigateToDetails }) => {
  const [showModal, setShowModal] = useState(false);
  const id = product._id || product.id;
  const title = product.title || product.name;

  return (
    <>
      <div className="group bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover-lift animate-fade-in-up hover:border-indigo-400 transition-colors duration-300">
        <div className="bg-gray-50 p-4">
          {product.videos && product.videos.length > 0 ? (
            <video
              src={product.videos[0]}
              poster={(product.images && product.images[0]) || product.image}
              className="w-full h-48 object-contain cursor-pointer bg-black transition-transform duration-500 group-hover:scale-110"
              onClick={() => navigateToDetails(id)}
              onMouseOver={(e) => e.target.play().catch(() => { })}
              onMouseOut={(e) => { e.target.pause(); e.target.currentTime = 0; }}
              muted
              loop
            />
          ) : (
            <img
              src={(product.images && product.images[0]) || product.image}
              alt={title}
              className="w-full h-48 object-contain cursor-pointer transition-transform duration-500 group-hover:scale-110"
              onClick={() => navigateToDetails(id)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/400x300/f0f4ff/4f46e5?text=${encodeURIComponent(title)}`;
              }}
            />
          )}
        </div>
        <div className="p-5">
          <p className="text-xs font-semibold text-indigo-500 uppercase mb-1">{product.category}</p>
          <h3
            className="text-lg font-bold text-gray-900 mb-2 truncate cursor-pointer"
            onClick={() => navigateToDetails(id)}
          >
            {title}
          </h3>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center mt-3">
            <div className="flex flex-col">
              {product.discount > 0 ? (
                <>
                  <span className="text-xs text-red-500 font-bold">-{product.discount}% OFF</span>
                  <span className="text-sm text-gray-400 line-through"> ₹{product.price.toFixed(2)}</span>
                  <span className="text-xl font-extrabold text-indigo-600"> ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                </>
              ) : (
                <span className="text-xl font-extrabold text-indigo-600"> ₹{product.price.toFixed(2)}</span>
              )}
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center bg-rose-500 hover:bg-rose-600 text-white font-medium py-2 px-3 sm:px-4 rounded-lg text-sm sm:text-base shadow-md transition duration-300 transform hover:scale-105"
            >
              <Heart className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">I'm Interested</span>
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <InterestModal product={product} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default ProductCard;
