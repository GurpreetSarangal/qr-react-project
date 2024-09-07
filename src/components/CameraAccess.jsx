import React, { useEffect, useState } from 'react';

const CameraAccess = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);
        setStream(stream);
      } catch (error) {
        console.error('Camera permission denied:', error);
        setHasPermission(false);
      }
    };
    requestCameraPermission();
  }, []);

  if (!hasPermission) {
    return <p>Camera permission is required to scan barcodes.</p>;
  }

  return <video autoPlay playsInline id="videoElement" />;
};

export default CameraAccess;