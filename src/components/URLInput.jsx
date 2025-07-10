import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch, FiLoader, FiAlertCircle } = FiIcons;

const URLInput = ({ onSubmit, loading, error }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Enter YouTube Video URL
        </h2>
        <p className="text-gray-600">
          Paste any YouTube video URL to extract and download its thumbnails
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors duration-200 pr-14"
            disabled={loading}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <SafeIcon 
              icon={FiSearch} 
              className="text-gray-400 text-xl" 
            />
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg"
          >
            <SafeIcon icon={FiAlertCircle} />
            <span>{error}</span>
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={loading || !url.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-red-500 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <SafeIcon icon={FiLoader} className="animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <span>Get Thumbnails</span>
          )}
        </motion.button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Supported formats: YouTube video URLs, YouTube Shorts, and YouTube Music</p>
      </div>
    </motion.div>
  );
};

export default URLInput;