import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiX, FiInfo } = FiIcons;

const AdConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  
  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('adConsent');
    if (!hasConsent) {
      // Show banner after a slight delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleAccept = () => {
    localStorage.setItem('adConsent', 'accepted');
    setShowBanner(false);
  };
  
  const handleDecline = () => {
    localStorage.setItem('adConsent', 'declined');
    setShowBanner(false);
    // Here you would typically disable personalized ads
  };
  
  if (!showBanner) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 p-4"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiInfo} className="text-blue-500 text-xl flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-gray-800">Cookie & Ad Consent</h3>
              <p className="text-sm text-gray-600 mt-1">
                We use cookies and display ads to enhance your experience. By clicking "Accept", you consent to our use of cookies and personalized ads.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 mt-3 md:mt-0">
            <button
              onClick={handleDecline}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              Accept
            </button>
          </div>
          
          <button 
            onClick={() => setShowBanner(false)} 
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <SafeIcon icon={FiX} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdConsentBanner;