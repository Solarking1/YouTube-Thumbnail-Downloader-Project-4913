import React from 'react';
import { motion } from 'framer-motion';
import ThumbnailCard from './ThumbnailCard';
import AdBanner from './AdBanner';

const ThumbnailGrid = ({ thumbnails }) => {
  // Function to insert ad after every n items
  const renderGridWithAds = () => {
    const itemsWithAds = [];
    const adFrequency = 3; // Insert ad after every 3 thumbnails
    
    thumbnails.forEach((thumbnail, index) => {
      // Add thumbnail
      itemsWithAds.push(
        <motion.div
          key={`thumbnail-${thumbnail.quality}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <ThumbnailCard thumbnail={thumbnail} />
        </motion.div>
      );
      
      // Add ad after every n items (except at the end)
      if ((index + 1) % adFrequency === 0 && index < thumbnails.length - 1) {
        itemsWithAds.push(
          <motion.div
            key={`ad-${index}`}
            className="col-span-1 md:col-span-2 lg:col-span-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AdBanner 
              adSlot={`inline-ad-${Math.floor(index / adFrequency)}`}
              adFormat="fluid"
              adLayout="in-article"
              className="py-2 my-4"
            />
          </motion.div>
        );
      }
    });
    
    return itemsWithAds;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Available Thumbnails
        </h2>
        <p className="text-gray-600">
          Click on any thumbnail to download it in full quality
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderGridWithAds()}
      </div>
    </div>
  );
};

export default ThumbnailGrid;