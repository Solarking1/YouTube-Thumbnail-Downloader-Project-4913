import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiAlertCircle } = FiIcons;

const AdBlockDetector = () => {
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  
  useEffect(() => {
    // Simple ad blocker detection
    const detectAdBlock = () => {
      const testAd = document.createElement('div');
      testAd.innerHTML = '&nbsp;';
      testAd.className = 'adsbox';
      document.body.appendChild(testAd);
      
      // If the height of the test ad is 0, an ad blocker is likely active
      setTimeout(() => {
        const isBlocked = testAd.offsetHeight === 0;
        setAdBlockDetected(isBlocked);
        document.body.removeChild(testAd);
      }, 100);
    };
    
    detectAdBlock();
  }, []);
  
  if (!adBlockDetected) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4 rounded-md"
    >
      <div className="flex items-start">
        <SafeIcon icon={FiAlertCircle} className="text-yellow-500 text-xl mr-2 mt-0.5" />
        <div>
          <h3 className="font-medium text-yellow-700">Ad Blocker Detected</h3>
          <p className="text-sm text-yellow-600 mt-1">
            We noticed you're using an ad blocker. This free service is supported by ads. 
            Please consider disabling your ad blocker to help us keep this tool free.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AdBlockDetector;