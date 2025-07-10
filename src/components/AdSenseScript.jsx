import React, { useEffect } from 'react';
import { isPersonalizedAdsAllowed, disablePersonalizedAds, enableAdSenseDebug } from '../utils/adUtils';

const AdSenseScript = () => {
  useEffect(() => {
    // Check if personalized ads are allowed
    if (!isPersonalizedAdsAllowed()) {
      disablePersonalizedAds();
    }
    
    // Enable debugging in development
    if (process.env.NODE_ENV === 'development') {
      enableAdSenseDebug();
    }
    
    // Check if script is already added
    if (!document.getElementById('google-adsense-script')) {
      const script = document.createElement('script');
      script.id = 'google-adsense-script';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX'; // Replace with your AdSense Publisher ID
      
      // Add error handling
      script.onerror = () => {
        console.error('Failed to load AdSense script');
      };
      
      document.head.appendChild(script);
      console.log('AdSense script added to head');
    }
  }, []);

  return null; // This component doesn't render anything
};

export default AdSenseScript;