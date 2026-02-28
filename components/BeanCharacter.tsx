
import React from 'react';

interface BeanCharacterProps {
  className?: string;
  size?: number;
  mood?: 'happy' | 'thinking' | 'surprised';
}

/**
 * Pixel Character Component
 * Recreates the user's pixel art avatar:
 * - Long black hair
 * - White wings
 * - Blue dress with pink trim
 * - Pixelated aesthetic
 */
const BeanCharacter: React.FC<BeanCharacterProps> = ({ className = '', size = 100, mood = 'happy' }) => {
  // We use a 32x32 grid to represent the pixel art faithfully
  return (
    <div 
      className={`relative inline-block transition-transform duration-300 ${className}`} 
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
        shapeRendering="crispEdges"
      >
        {/* WINGS (Back Layer) */}
        <g opacity="0.9">
          {/* Left Wing */}
          <rect x="2" y="12" width="2" height="2" fill="white" stroke="#999" strokeWidth="0.2" />
          <rect x="4" y="11" width="4" height="4" fill="white" stroke="#999" strokeWidth="0.2" />
          <rect x="3" y="13" width="6" height="3" fill="white" stroke="#999" strokeWidth="0.2" />
          {/* Right Wing */}
          <rect x="28" y="12" width="2" height="2" fill="white" stroke="#999" strokeWidth="0.2" />
          <rect x="24" y="11" width="4" height="4" fill="white" stroke="#999" strokeWidth="0.2" />
          <rect x="23" y="13" width="6" height="3" fill="white" stroke="#999" strokeWidth="0.2" />
        </g>

        {/* HAIR (Back layer) */}
        <rect x="8" y="15" width="16" height="12" fill="#1A1A1A" />
        <rect x="7" y="18" width="2" height="8" fill="#1A1A1A" />
        <rect x="23" y="18" width="2" height="8" fill="#1A1A1A" />
        <path d="M7 26 L9 26 L9 28 L7 28 Z" fill="#1A1A1A" />
        <path d="M23 26 L25 26 L25 28 L23 28 Z" fill="#1A1A1A" />

        {/* BODY (Dress) */}
        <rect x="11" y="20" width="10" height="8" fill="#00B4D8" /> {/* Blue Dress */}
        <rect x="11" y="20" width="10" height="2" fill="#F9A8D4" /> {/* Pink Top Trim */}
        <rect x="11" y="27" width="10" height="2" fill="#F9A8D4" /> {/* Pink Bottom Trim */}
        
        {/* LEGS & SHOES */}
        <rect x="12" y="28" width="3" height="3" fill="#EBD2B5" />
        <rect x="17" y="28" width="3" height="3" fill="#EBD2B5" />
        <rect x="12" y="30" width="3" height="2" fill="#1A1A1A" />
        <rect x="17" y="30" width="3" height="2" fill="#1A1A1A" />

        {/* HEAD */}
        <rect x="10" y="8" width="12" height="12" fill="#EBD2B5" />
        
        {/* HAIR (Front Layer) */}
        <rect x="9" y="6" width="14" height="4" fill="#1A1A1A" />
        <rect x="10" y="5" width="12" height="1" fill="#1A1A1A" />
        <rect x="9" y="10" width="2" height="8" fill="#1A1A1A" />
        <rect x="21" y="10" width="2" height="8" fill="#1A1A1A" />
        {/* Bangs */}
        <rect x="14" y="10" width="4" height="2" fill="#1A1A1A" />
        <rect x="13" y="11" width="1" height="2" fill="#1A1A1A" />
        <rect x="18" y="11" width="1" height="2" fill="#1A1A1A" />

        {/* EYES */}
        <g>
          <rect x="12" y="13" width="3" height="3" fill="black" />
          <rect x="17" y="13" width="3" height="3" fill="black" />
          <rect x="12" y="13" width="1" height="1" fill="white" opacity="0.8" />
          <rect x="17" y="13" width="1" height="1" fill="white" opacity="0.8" />
        </g>
        
        {/* MOUTH */}
        {mood === 'happy' && (
          <rect x="15" y="17" width="2" height="1" fill="black" opacity="0.6" />
        )}
        {mood === 'thinking' && (
          <rect x="15" y="17" width="3" height="0.5" fill="black" opacity="0.4" />
        )}
        {mood === 'surprised' && (
          <rect x="15" y="17" width="2" height="2" fill="black" opacity="0.6" />
        )}

        {/* Blush */}
        <rect x="11" y="16" width="2" height="1" fill="#F9A8D4" opacity="0.5" />
        <rect x="19" y="16" width="2" height="1" fill="#F9A8D4" opacity="0.5" />
      </svg>
    </div>
  );
};

export default BeanCharacter;
