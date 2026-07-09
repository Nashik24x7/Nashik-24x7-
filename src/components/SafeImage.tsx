import React, { useState, useEffect } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackText?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ src, fallbackText, className, alt, ...props }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setCurrentSrc(src);
    setRetryCount(0);
  }, [src]);

  const handleError = () => {
    // If it's a Google Drive link, let's try other formats
    if (src && (src.includes('googleusercontent.com') || src.includes('drive.google.com') || src.includes('docs.google.com'))) {
      // Extract Google Drive ID if present
      let driveId = '';
      
      // Match lh3 or standard file view
      const lh3Match = src.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (lh3Match && lh3Match[1]) {
        driveId = lh3Match[1];
      } else {
        // Match standard url id query param
        const idParamMatch = src.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        if (idParamMatch && idParamMatch[1]) {
          driveId = idParamMatch[1];
        }
      }

      if (driveId) {
        if (retryCount === 0) {
          // Retry 1: Try Google Drive high-resolution thumbnail endpoint (Highly reliable, bypasses most cookie blocks)
          setRetryCount(1);
          setCurrentSrc(`https://drive.google.com/thumbnail?id=${driveId}&sz=w1000`);
          return;
        } else if (retryCount === 1) {
          // Retry 2: Try standard download endpoint
          setRetryCount(2);
          setCurrentSrc(`https://docs.google.com/uc?export=download&id=${driveId}`);
          return;
        } else if (retryCount === 2) {
          // Retry 3: Try simple embed view link
          setRetryCount(3);
          setCurrentSrc(`https://drive.google.com/uc?id=${driveId}`);
          return;
        }
      }
    }

    // Default Fallback: Elegant high-quality Unsplash news/city background placeholder
    const fallbackPlaceholders = [
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80', // Newspaper desk
      'https://images.unsplash.com/photo-1495020689067-958852a6565d?auto=format&fit=crop&w=800&q=80', // Reading paper
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', // Global technology news
      'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80'  // Education/Books
    ];
    
    // Choose a fallback placeholder deterministically based on title or fallbackText
    const index = fallbackText ? Math.abs(fallbackText.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % fallbackPlaceholders.length : 0;
    setCurrentSrc(fallbackPlaceholders[index]);
  };

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      referrerPolicy="no-referrer"
    />
  );
};
