
import React, { useRef, useEffect } from 'react';
import { Pause, Volume2, VolumeX, Heart, Star } from 'lucide-react';

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

interface MoodCardProps {
  mood: Mood;
  isActive: boolean;
  isPlaying: boolean;
  onPlayToggle: () => void;
}

const MoodCard: React.FC<MoodCardProps> = ({ mood, isActive, isPlaying, onPlayToggle }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(true);
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, isPlaying]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="relative h-[75vh] md:h-[85vh] group overflow-hidden rounded-3xl">
      {/* Video Background */}
      <div className="relative w-full h-full">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center rounded-3xl">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white/70"></div>
              <p className="text-white/70 text-lg font-medium">Loading magic...</p>
            </div>
          </div>
        )}
        <video
          ref={videoRef}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 rounded-3xl"
          muted={isMuted}
          loop
          playsInline
          onLoadedData={handleVideoLoad}
        >
          <source src={mood.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Multiple Gradient Overlays for depth */}
      <div className={`absolute inset-0 bg-gradient-to-t ${mood.gradient} opacity-20 rounded-3xl`} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 rounded-3xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 rounded-3xl" />

      {/* Cute floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-white/30 rounded-full animate-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white">
        <div className="transform transition-all duration-700 group-hover:translate-y-0 translate-y-2">
          {/* Main content */}
          <div className="flex items-end space-x-6 mb-6">
            <div className="relative">
              <span className="text-8xl md:text-9xl animate-float inline-block filter drop-shadow-2xl">
                {mood.emoji}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full blur-2xl animate-pulse-glow" />
            </div>
            <div className="flex-1">
              <h3 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent filter drop-shadow-xl">
                {mood.name}
              </h3>
              <p className="text-2xl md:text-3xl text-white/95 max-w-2xl font-light leading-relaxed tracking-wide">
                {mood.description}
              </p>
            </div>
          </div>
          
          {/* Enhanced Video Controls - Only visible when playing and on hover */}
          {isPlaying && (
            <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onPlayToggle}
                  className="bg-white/25 backdrop-blur-xl p-5 rounded-2xl hover:bg-white/35 transition-all duration-300 hover:scale-110 shadow-2xl border border-white/30"
                >
                  <Pause size={28} />
                </button>
                
                <button
                  onClick={toggleMute}
                  className="bg-white/25 backdrop-blur-xl p-5 rounded-2xl hover:bg-white/35 transition-all duration-300 hover:scale-110 shadow-2xl border border-white/30"
                >
                  {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-3">
                <button className="bg-pink-500/30 backdrop-blur-xl p-4 rounded-2xl hover:bg-pink-500/50 transition-all duration-300 hover:scale-110 shadow-2xl border border-pink-300/30">
                  <Heart size={24} className="text-pink-200" />
                </button>
                <button className="bg-yellow-500/30 backdrop-blur-xl p-4 rounded-2xl hover:bg-yellow-500/50 transition-all duration-300 hover:scale-110 shadow-2xl border border-yellow-300/30">
                  <Star size={24} className="text-yellow-200" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Floating Mood Badge */}
      <div className="absolute top-8 right-8">
        <div className={`bg-gradient-to-r ${mood.gradient} px-8 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border-2 border-white/30 transform transition-all duration-500 hover:scale-110`}>
          <span className="text-white font-bold text-base uppercase tracking-wider flex items-center space-x-3">
            <span>{mood.name}</span>
            <span className="text-2xl">{mood.emoji}</span>
          </span>
        </div>
      </div>

      {/* Mood-specific corner decoration */}
      <div className="absolute top-0 left-0 w-40 h-40 opacity-30">
        <div className={`w-full h-full bg-gradient-to-br ${mood.gradient} rounded-br-full blur-2xl`} />
      </div>

      {/* Bottom glow effect */}
      <div className={`absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t ${mood.gradient} opacity-30 blur-2xl rounded-b-3xl`} />

      {/* Interactive border on hover */}
      <div className="absolute inset-0 border-4 border-transparent bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
    </div>
  );
};

export default MoodCard;
