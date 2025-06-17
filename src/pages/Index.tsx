
import React from 'react';
import MoodCarousel from '../components/MoodCarousel';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-16">
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight animate-fade-in">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Mood
              </span>
              <span className="ml-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Gallery
              </span>
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>
          <p className="text-2xl md:text-3xl text-purple-200 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in">
            Explore a spectrum of emotions through beautiful, immersive video moments
          </p>
          
          {/* Decorative elements */}
          <div className="flex justify-center space-x-8 mt-8">
            {['🎭', '🎬', '✨'].map((emoji, index) => (
              <span 
                key={index}
                className="text-4xl animate-float opacity-70"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
        
        <MoodCarousel />
        
        {/* Bottom decoration */}
        <div className="text-center mt-16 opacity-70">
          <p className="text-purple-300 text-lg font-light">
            Swipe, click, or use arrow keys to navigate • Press space to play/pause
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
