// Extract video ID from various YouTube URL formats
export const extractVideoId = (url) => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    /youtu\.be\/([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
};

// Generate thumbnail URLs for different qualities
export const generateThumbnailUrls = (videoId) => {
  const baseUrl = 'https://img.youtube.com/vi';
  
  const thumbnails = [
    {
      quality: 'maxresdefault',
      url: `${baseUrl}/${videoId}/maxresdefault.jpg`,
      dimensions: '1280x720',
      description: 'Maximum Resolution'
    },
    {
      quality: 'sddefault',
      url: `${baseUrl}/${videoId}/sddefault.jpg`,
      dimensions: '640x480',
      description: 'Standard Definition'
    },
    {
      quality: 'hqdefault',
      url: `${baseUrl}/${videoId}/hqdefault.jpg`,
      dimensions: '480x360',
      description: 'High Quality'
    },
    {
      quality: 'mqdefault',
      url: `${baseUrl}/${videoId}/mqdefault.jpg`,
      dimensions: '320x180',
      description: 'Medium Quality'
    },
    {
      quality: 'default',
      url: `${baseUrl}/${videoId}/default.jpg`,
      dimensions: '120x90',
      description: 'Default Quality'
    },
    {
      quality: '0',
      url: `${baseUrl}/${videoId}/0.jpg`,
      dimensions: '480x360',
      description: 'Full Size'
    }
  ];

  return thumbnails;
};

// Validate YouTube URL
export const isValidYouTubeUrl = (url) => {
  return extractVideoId(url) !== null;
};