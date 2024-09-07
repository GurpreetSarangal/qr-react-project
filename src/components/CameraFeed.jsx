import React, { useEffect, useRef, useState } from 'react';

const CameraFeed = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const requestCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        setHasPermission(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    requestCamera();
  }, []);

  if (!hasPermission) {
    return <p>Need camera permission to scan barcodes</p>;
  }

  return <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} />;
};

export default CameraFeed;
