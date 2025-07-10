import React, { useEffect, useRef } from 'react';

const AdBanner = ({ adSlot, adFormat, adLayout, className }) => {
  const adRef = useRef(null);
  
  useEffect(() => {
    // Check if AdSense is loaded
    if (window.adsbygoogle) {
      try {
        // Push the ad to AdSense for serving
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log('AdSense ad pushed for rendering');
      } catch (error) {
        console.error('Error rendering AdSense ad:', error);
      }
    } else {
      console.warn('AdSense not loaded yet');
    }
  }, []);

  return (
    <div className={`ad-container ${className || ''}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your actual AdSense Publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat || 'auto'}
        data-full-width-responsive="true"
        data-ad-layout={adLayout || null}
      ></ins>
      <div className="text-xs text-gray-400 text-center mt-1">Advertisement</div>
    </div>
  );
};

export default AdBanner;