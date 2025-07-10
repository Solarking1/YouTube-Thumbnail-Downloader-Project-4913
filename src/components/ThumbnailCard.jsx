import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDownload, FiImage, FiCheck } = FiIcons;

const ThumbnailCard = ({ thumbnail }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    
    try {
      const response = await fetch(thumbnail.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `youtube-thumbnail-${thumbnail.quality}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative aspect-video bg-gray-200">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <SafeIcon icon={FiImage} className="text-gray-400 text-3xl" />
          </div>
        )}
        <img
          src={thumbnail.url}
          alt={`${thumbnail.quality} thumbnail`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(false)}
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-800 capitalize">
              {thumbnail.quality}
            </h3>
            <p className="text-sm text-gray-600">
              {thumbnail.dimensions}
            </p>
          </div>
          <div className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
            {thumbnail.quality.toUpperCase()}
          </div>
        </div>
        
        <motion.button
          onClick={handleDownload}
          disabled={downloading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
            downloaded
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white hover:bg-red-600 disabled:opacity-50'
          }`}
        >
          {downloading ? (
            <>
              <SafeIcon icon={FiDownload} className="animate-bounce" />
              <span>Downloading...</span>
            </>
          ) : downloaded ? (
            <>
              <SafeIcon icon={FiCheck} />
              <span>Downloaded!</span>
            </>
          ) : (
            <>
              <SafeIcon icon={FiDownload} />
              <span>Download</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ThumbnailCard;