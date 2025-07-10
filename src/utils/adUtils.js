// Check if the user is in the EU for GDPR compliance
export const checkEULocation = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    // List of EU countries
    const euCountries = [
      'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
      'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
      'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
    ];
    
    return euCountries.includes(data.country_code);
  } catch (error) {
    console.error('Failed to check location:', error);
    // Default to true (requiring consent) if check fails
    return true;
  }
};

// Get ad consent status
export const getAdConsentStatus = () => {
  return localStorage.getItem('adConsent') || 'unknown';
};

// Check if personalized ads are allowed
export const isPersonalizedAdsAllowed = () => {
  const consent = getAdConsentStatus();
  return consent === 'accepted';
};

// Disable personalized ads
export const disablePersonalizedAds = () => {
  if (window.adsbygoogle) {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.requestNonPersonalizedAds = 1;
  }
};

// Enable debugging for AdSense
export const enableAdSenseDebug = () => {
  if (process.env.NODE_ENV === 'development') {
    window.google_console = window.google_console || {};
    window.google_console.debug = true;
  }
};