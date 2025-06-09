"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const [count, setCount] = useState(4);

  useEffect(() => {
    if (isVisible) return;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const fadeInAnimation = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
    transition: {
      // duration: 0.4,
      scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
    },
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full">
        {count === 0 && <Confetti />}

        <AnimatePresence mode="wait">
          {isVisible ? (
            <>
              <motion.div
                key="bolt-logo"
                {...fadeInAnimation}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsVisible(false)}
                className="cursor-pointer"
              >
                <Image
                  src="/GAT_Bolt Mark RGB _1C White.png"
                  alt="Bolt logo"
                  width={250}
                  height={286}
                  priority
                />
              </motion.div>

              <motion.div key="tap-text" {...fadeInAnimation}>
                <h1 className="text-4xl font-bold text-center font-[family-name:var(--font-proximanova)]">
                  Tap the bolt
                </h1>
              </motion.div>
            </>
          ) : (
            <motion.div
              key="countdown-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-[350px]"
            >
              <motion.div className="flex items-center justify-center bg-white rounded-full w-[120px] h-[120px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={count}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl font-bold text-[#f95001] font-[family-name:var(--font-proximanova)]"
                  >
                    {count}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
