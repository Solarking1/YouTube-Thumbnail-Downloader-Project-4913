import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDownload, FiYoutube } = FiIcons;

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-lg border-b-4 border-red-500"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="bg-red-500 p-3 rounded-full">
              <SafeIcon icon={FiYoutube} className="text-white text-2xl" />
            </div>
            <SafeIcon icon={FiDownload} className="text-red-500 text-2xl" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              YouTube Thumbnail Downloader
            </h1>
            <p className="text-gray-600 mt-1">
              Download high-quality thumbnails from any YouTube video
            </p>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;