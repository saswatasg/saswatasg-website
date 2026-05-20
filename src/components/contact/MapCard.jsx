import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const MapCard = ({ custom }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://i.postimg.cc/NMLsRFrR/kolkata-map-preview.png";
    img.onload = () => {
      setTimeout(() => setIsLoaded(true), 500);
    };
  }, []);

  const handleMapClick = () => {
    window.open("https://maps.app.goo.gl/dKgHkFhawWi7z7e48", "_blank", "noopener,noreferrer");
  };

  return (
    <Card custom={custom} className="overflow-hidden h-full flex flex-col">
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">Get In Touch</h1>
          <p className="text-lg text-foreground/80 mt-2">I'm currently based in the vibrant city of Kolkata, India. Feel free to reach out—I'm always excited to discuss new projects and opportunities.</p>
        </div>
        <div 
          onClick={handleMapClick} 
          className="relative aspect-video lg:aspect-auto lg:flex-grow rounded-xl overflow-hidden cursor-pointer group"
          aria-label="Open map location for Kolkata, India in new tab"
        >
          {!isLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <motion.img
            src="https://i.postimg.cc/NMLsRFrR/kolkata-map-preview.png"
            alt="Map preview showing Kolkata, India"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <div className="text-white font-semibold bg-black/50 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                View on Google Maps
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapCard;