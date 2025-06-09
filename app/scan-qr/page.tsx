"use client";

import Webcam from "react-webcam";
import { useRef, useState, useCallback, useEffect } from "react";
import jsQR from "jsqr";

export default function ScanQr() {
  const webcamRef = useRef<Webcam>(null);
  const [qrData, setQrData] = useState<string | null>(null);
  const [scanning, setScanning] = useState(true);
  const [cameraError, setCameraError] = useState(false);

  const scanQRCode = useCallback(() => {
    if (!scanning) return;

    if (webcamRef.current?.video?.readyState === 4) {
      const video = webcamRef.current.video;

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setQrData(code.data);
        // Stop scanning when QR found
        setScanning(false);

        window.open(code.data, "_blank");
      }
    }
  }, [scanning]);

  useEffect(() => {
    if (!scanning) return;

    const interval = setInterval(scanQRCode, 500);
    return () => clearInterval(interval);
  }, [scanQRCode, scanning]);

  // Handle camera errors
  const handleCameraError = () => {
    setCameraError(true);
    setScanning(false);
  };

  // Reset scanner
  const resetScanner = () => {
    setQrData(null);
    setScanning(true);
    setCameraError(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 font-[family-name:var(--font-proximanova)]">
          Scan Sign-Up QR Code
        </h1>
        <p className="text-white mb-8">Please scan the QR code to proceed.</p>

        {cameraError ? (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
            Camera access denied or not available.
            <br />
            Please allow camera access.
          </div>
        ) : (
          <div className="relative rounded-lg overflow-hidden">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "environment" }}
              onUserMediaError={handleCameraError}
            />
          </div>
        )}

        {qrData && (
          <div className="mt-4 p-4 bg-white rounded-lg text-[#f95001]">
            <p className="font-bold mb-2">QR Code Detected!</p>
            <p className="truncate">{qrData}</p>
            <p className="text-sm mt-2">Opening link in new tab...</p>
            <button
              className="mt-4 px-4 py-2 bg-[#f95001] text-white rounded-lg"
              onClick={resetScanner}
            >
              Scan Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
