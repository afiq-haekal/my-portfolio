import React, { useEffect, useState } from 'react';

const SplashCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: mousePosition.x - 15,
        top: mousePosition.y - 15,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse shadow-lg"></div>
        <div className="absolute inset-0 w-8 h-8 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full animate-ping opacity-70"></div>
        <div className="absolute inset-1 w-6 h-6 bg-white rounded-full opacity-30 animate-pulse"></div>
      </div>
    </div>
  );
};

export default SplashCursor;
