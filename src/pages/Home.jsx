import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import URLInput from '../components/URLInput';
import ThumbnailGrid from '../components/ThumbnailGrid';
import AdBanner from '../components/AdBanner';
import AdBlockDetector from '../components/AdBlockDetector';
import { extractVideoId, generateThumbnailUrls } from '../utils/thumbnailUtils';

const Home = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUrlSubmit = async (url) => {
    setLoading(true);
    setError('');
    setThumbnails([]);

    try {
      const videoId = extractVideoId(url);
      if (!videoId) {
        throw new Error('Invalid YouTube URL. Please enter a valid YouTube video URL.');
      }

      const thumbnailUrls = generateThumbnailUrls(videoId);
      setThumbnails(thumbnailUrls);
      setVideoUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Ad block detector */}
          <AdBlockDetector />
          
          {/* Top ad banner */}
          <div className="mb-6">
            <AdBanner 
              adSlot="1234567890" 
              adFormat="horizontal" 
              className="py-2 bg-white rounded-lg shadow-md"
            />
          </div>
          
          <URLInput 
            onSubmit={handleUrlSubmit}
            loading={loading}
            error={error}
          />
          
          {thumbnails.length > 0 && (
            <>
              {/* Middle ad banner - shown only after search results */}
              <div className="my-6">
                <AdBanner 
                  adSlot="0987654321" 
                  adFormat="rectangle" 
                  className="py-2 bg-white rounded-lg shadow-md"
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-4"
              >
                <ThumbnailGrid thumbnails={thumbnails} />
              </motion.div>
              
              {/* Bottom ad banner */}
              <div className="mt-6">
                <AdBanner 
                  adSlot="1122334455" 
                  adFormat="horizontal" 
                  className="py-2 bg-white rounded-lg shadow-md"
                />
              </div>
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Home;