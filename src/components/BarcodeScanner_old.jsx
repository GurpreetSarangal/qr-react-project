import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

const BarcodeScanner = () => {
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const startScan = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
          if (result) {
            setResult(result.text);  // Get the barcode value
          }
          if (err) {
            console.warn(err);
          }
        });
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startScan();

    return () => {
      codeReader.reset(); // Stop the scanner when the component is unmounted
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} />
      <p>{result ? `Scanned Barcode: ${result}` : 'Scanning...'}</p>
    </div>
  );
};

export default BarcodeScanner;
