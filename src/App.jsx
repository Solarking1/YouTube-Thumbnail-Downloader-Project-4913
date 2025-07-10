import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdSenseScript from './components/AdSenseScript';
import AdConsentBanner from './components/AdConsentBanner';
import './App.css';

function App() {
  return (
    <Router>
      <AdSenseScript />
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <AdConsentBanner />
      </div>
    </Router>
  );
}

export default App;