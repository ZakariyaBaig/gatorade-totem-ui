"use client";

import { motion } from "motion/react";

export default function ScanQr() {
  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      <h1 className="absolute top-0 w-full text-center text-5xl font-bold mt-20 font-[family-name:var(--font-proximanova)]">
        TIME TO HYDRATE!
      </h1>
      <div className="w-full flex flex-col items-center justify-center">
        <motion.img
          src="/GTQ_SOPBOP_STIM_NEWVIS_FULL_A1.png"
          alt="Water Bottle"
          className="absolute w-100 h-auto"
          initial={{ x: "-110%", opacity: 0, rotate: -10, scale: 0.8 }}
          animate={{
            x: "110%",
            opacity: 1,
            rotate: 10,
            scale: 1,
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            y: { duration: 0.8, ease: "easeInOut", repeat: Infinity },
          }}
        />
      </div>
    </div>
  );
}
