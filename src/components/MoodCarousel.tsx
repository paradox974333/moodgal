
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import MoodCard from './MoodCard';

interface Mood {
  id: string;
  name: string;
  color: string;
  gradient: string;
  videoUrl: string;
  description: string;
  emoji: string;
  bgPattern: string;
}

const moods: Mood[] = [
  {
    id: 'cute',
    name: 'Cute',
    color: 'pink',
    gradient: 'from-pink-400 via-rose-300 to-pink-500',
    videoUrl: 'IMG_1806_20250617_182256_433c4a50.mov',
    description: 'Adorable and heartwarming moments',
    emoji: '🥰',
    bgPattern: 'radial-gradient(circle at 20% 50%, rgba(255, 182, 193, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 192, 203, 0.3) 0%, transparent 50%)'
  },
  {
    id: 'angry',
    name: 'Angry',
    color: 'red',
    gradient: 'from-red-500 via-orange-500 to-red-600',
    videoUrl: 'IMG_2764_20250617_175239_8dc29587.mp4',
    description: 'Fierce and passionate intensity',
    emoji: '😡',
    bgPattern: 'radial-gradient(circle at 30% 30%, rgba(255, 69, 0, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(220, 20, 60, 0.3) 0%, transparent 50%)'
  },
  {
    id: 'calm',
    name: 'beautiful',
    color: 'blue',
    gradient: 'from-blue-400 via-cyan-300 to-teal-400',
    videoUrl: 'IMG_0446_20250617_181514_f194e1da.mov',
    description: 'Peaceful and tranquil serenity',
    emoji: '😌',
    bgPattern: 'radial-gradient(circle at 40% 60%, rgba(135, 206, 235, 0.3) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(173, 216, 230, 0.3) 0%, transparent 50%)'
  },
  {
    id: 'excited',
    name: 'Excited',
    color: 'yellow',
    gradient: 'from-yellow-400 via-orange-400 to-amber-500',
    videoUrl: 'IMG_2771_20250617_182936_e4732bfe.mov',
    description: 'Bursting with energy and joy',
    emoji: '🤩',
    bgPattern: 'radial-gradient(circle at 25% 75%, rgba(255, 215, 0, 0.4) 0%, transparent 50%), radial-gradient(circle at 75% 25%, rgba(255, 165, 0, 0.3) 0%, transparent 50%)'
  },
  {
    id: 'dumb',
    name: 'Silly',
    color: 'purple',
    gradient: 'from-purple-400 via-violet-400 to-purple-500',
    videoUrl: 'IMG_3793_20250617_182546_8b26b20c.mov',
    description: 'Playfully goofy and fun',
    emoji: '🤪',
    bgPattern: 'radial-gradient(circle at 50% 20%, rgba(138, 43, 226, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(147, 112, 219, 0.3) 0%, transparent 50%)'
  },
  {
    id: 'love',
    name: 'Love',
    color: 'rose',
    gradient: 'from-rose-400 via-pink-400 to-red-400',
    videoUrl: 'IMG_3795_20250617_182802_162f74bb.mov',
    description: 'Warm affection and tenderness',
    emoji: '😍',
    bgPattern: 'radial-gradient(circle at 60% 40%, rgba(255, 20, 147, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 60%, rgba(255, 105, 180, 0.3) 0%, transparent 50%)'
  }
];

const MoodCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % moods.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + moods.length) % moods.length);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX - startX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100;
    if (currentX > threshold) {
      prevSlide();
    } else if (currentX < -threshold) {
      nextSlide();
    }
    
    setCurrentX(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX - startX);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Main Carousel */}
      <div 
        ref={carouselRef}
        className="relative overflow-hidden rounded-3xl shadow-2xl cursor-grab active:cursor-grabbing backdrop-blur-sm"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          background: moods[currentIndex].bgPattern,
          boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(${moods[currentIndex].color === 'pink' ? '255, 182, 193' : moods[currentIndex].color === 'red' ? '255, 69, 0' : moods[currentIndex].color === 'blue' ? '135, 206, 235' : moods[currentIndex].color === 'yellow' ? '255, 215, 0' : moods[currentIndex].color === 'purple' ? '138, 43, 226' : '255, 20, 147'}, 0.3)`
        }}
      >
        <div 
          className="flex transition-all duration-700 ease-out"
          style={{ 
            transform: `translateX(${-currentIndex * 100 + (currentX / 8)}%)` 
          }}
        >
          {moods.map((mood, index) => (
            <div key={mood.id} className="w-full flex-shrink-0">
              <MoodCard 
                mood={mood} 
                isActive={index === currentIndex}
                isPlaying={isPlaying}
                onPlayToggle={() => setIsPlaying(!isPlaying)}
              />
            </div>
          ))}
        </div>

        {/* SINGLE MAIN PLAY BUTTON - Only shows when not playing */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <button
              onClick={() => setIsPlaying(true)}
              className={`group/play relative bg-white/20 backdrop-blur-2xl border-3 border-white/40 text-white p-12 rounded-full hover:bg-white/30 transition-all duration-700 hover:scale-125 shadow-2xl`}
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15))`,
                boxShadow: `0 0 60px rgba(255,255,255,0.4), 0 0 120px ${moods[currentIndex].color === 'pink' ? 'rgba(255, 182, 193, 0.5)' : moods[currentIndex].color === 'red' ? 'rgba(255, 69, 0, 0.5)' : moods[currentIndex].color === 'blue' ? 'rgba(135, 206, 235, 0.5)' : moods[currentIndex].color === 'yellow' ? 'rgba(255, 215, 0, 0.5)' : moods[currentIndex].color === 'purple' ? 'rgba(138, 43, 226, 0.5)' : 'rgba(255, 20, 147, 0.5)'}`
              }}
            >
              <Play size={64} className="ml-3 group-hover/play:scale-110 transition-transform duration-300" />
              
              {/* Enhanced ripple effects */}
              <div className="absolute inset-0 rounded-full border-3 border-white/50 animate-ping opacity-75"></div>
              <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" style={{ animationDelay: '0.5s' }}></div>
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-2xl text-white p-5 rounded-2xl hover:bg-white/40 transition-all duration-500 hover:scale-125 shadow-2xl group border-2 border-white/30 z-30"
      >
        <ChevronLeft size={32} className="group-hover:animate-pulse" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-2xl text-white p-5 rounded-2xl hover:bg-white/40 transition-all duration-500 hover:scale-125 shadow-2xl group border-2 border-white/30 z-30"
      >
        <ChevronRight size={32} className="group-hover:animate-pulse" />
      </button>

      {/* Enhanced Global Play/Pause Button - Smaller and positioned better */}
      {isPlaying && (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/30 backdrop-blur-2xl text-white p-4 rounded-2xl hover:bg-white/40 transition-all duration-500 hover:scale-110 shadow-2xl group border-2 border-white/40 z-30"
          style={{
            boxShadow: `0 0 30px rgba(255,255,255,0.4), 0 10px 20px rgba(0,0,0,0.3)`
          }}
        >
          <Pause size={24} className="group-hover:animate-pulse" />
        </button>
      )}

      {/* Enhanced Mood Indicators */}
      <div className="flex justify-center space-x-5 mt-12">
        {moods.map((mood, index) => (
          <button
            key={mood.id}
            onClick={() => setCurrentIndex(index)}
            className={`relative transition-all duration-500 ${
              index === currentIndex 
                ? 'w-16 h-6 scale-125' 
                : 'w-6 h-6 hover:scale-110'
            }`}
          >
            <div className={`w-full h-full rounded-full transition-all duration-500 border-2 ${
              index === currentIndex 
                ? `bg-gradient-to-r ${mood.gradient} shadow-2xl animate-pulse-glow border-white/50` 
                : 'bg-white/50 hover:bg-white/70 backdrop-blur-sm border-white/30'
            }`} />
            {index === currentIndex && (
              <>
                <div className="absolute inset-0 rounded-full animate-ping bg-white/40" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs">
                  {mood.emoji}
                </div>
              </>
            )}
          </button>
        ))}
      </div>

      {/* Enhanced Mood Display */}
      <div className="text-center mt-10 space-y-6">
        <div className="relative">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-4 animate-fade-in">
            <span className="text-8xl md:text-9xl animate-float inline-block mr-6 filter drop-shadow-2xl">
              {moods[currentIndex].emoji}
            </span>
            <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              {moods[currentIndex].name}
            </span>
          </h2>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>
        <p className="text-2xl md:text-3xl text-white/95 max-w-3xl mx-auto animate-fade-in font-light leading-relaxed tracking-wide">
          {moods[currentIndex].description}
        </p>
        
        {/* Enhanced mood counter */}
        <div className="flex items-center justify-center space-x-4 text-white/80 text-lg font-medium">
          <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">{currentIndex + 1}</span>
          <div className="w-12 h-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-white/70 to-white/50 transition-all duration-700 ease-out rounded-full"
              style={{ width: `${((currentIndex + 1) / moods.length) * 100}%` }}
            />
          </div>
          <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">{moods.length}</span>
        </div>

        {/* Enhanced play status indicator */}
        <div className="flex items-center justify-center space-x-4 text-white/70 text-base">
          <div className={`w-3 h-3 rounded-full border-2 border-white/50 ${isPlaying ? 'bg-green-400 animate-pulse shadow-lg shadow-green-400/50' : 'bg-gray-400'}`}></div>
          <span className="bg-white/15 px-4 py-2 rounded-full backdrop-blur-sm font-medium">
            {isPlaying ? '▶ Playing' : '⏸ Paused'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MoodCarousel;
