// src/pages/Home.jsx
import React from 'react';
import { Code, Lock, Headset } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  return (
    <div className="space-y-16 overflow-hidden">
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 shadow-2xl p-10 sm:p-24 text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-indigo-400 rounded-full blur-[120px] animate-pulse-subtle"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-400 rounded-full blur-[120px] animate-pulse-subtle delay-700"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-up">
          <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight tracking-tight">
            Fusion of Technology <span className="text-indigo-200">&</span> Innovation
          </h1>
          <p className="text-xl sm:text-2xl mb-8 opacity-90">
            Your source for cutting-edge electronics, 3D printing, and full-stack solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => navigate('/products')}
              className="w-full sm:w-auto bg-white text-indigo-700 font-bold py-3.5 px-8 rounded-xl shadow-lg hover:bg-indigo-50 transition duration-300 transform hover:scale-105"
            >
              Explore Products
            </button>
            <button
              onClick={() => navigate('/services')}
              className="w-full sm:w-auto bg-transparent border border-white text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:bg-white/10 transition duration-300 transform hover:scale-105"
            >
              Our Services
            </button>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <Code className="w-full h-full" />
        </div>
      </section>

      <section>
        <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">Featured Picks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-10 text-gray-500">Loading featured products...</div>
          ) : (
            products.slice(0, 3).map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                navigateToDetails={() => navigate(`/products/${product._id || product.id}`)}
              />
            ))
          )}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/products')}
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center justify-center mx-auto"
          >
            View All Products
            <span className="ml-1 transform rotate-180">&larr;</span>
          </button>
        </div>
      </section>

      <section className="bg-gray-50 rounded-xl p-8 shadow-inner">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose TechFusion?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <ValuePropCard
            icon={Lock}
            title="Secure & Private"
            description="All data is handled with industry-standard security protocols for a private shopping experience."
            delay="delay-0"
          />
          <ValuePropCard
            icon={Code}
            title="Cutting-Edge Tech"
            description="We specialize in the latest hardware, full-stack development, and IoT smart devices."
            delay="delay-150"
          />
          <ValuePropCard
            icon={Headset}
            title="Expert Support"
            description="Dedicated technical support available 24/7 for all your professional needs."
            delay="delay-300"
          />
        </div>
      </section>
    </div>
  );
};

const ValuePropCard = ({ icon: Icon, title, description, delay }) => (
  <div className={`p-8 bg-white rounded-2xl shadow-xl border border-gray-100 hover-lift animate-fade-in-up ${delay}`}>
    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
      <Icon className="w-8 h-8 text-indigo-600" />
    </div>
    <h4 className="text-2xl font-bold text-gray-900 mb-3">{title}</h4>
    <p className="text-gray-500 leading-relaxed">{description}</p>
  </div>
);

export default Home;
