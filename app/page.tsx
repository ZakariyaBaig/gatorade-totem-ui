import Image from "next/image";
import * as motion from "motion/react-client";

export default function Home() {
  const fadeInAnimation = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: 0.4,
      scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
    },
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <motion.div
          {...fadeInAnimation}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src="/GAT_Bolt Mark RGB _1C White.png"
            alt="Bolt logo"
            width={250}
            height={286}
            priority
          />
        </motion.div>
        <motion.div {...fadeInAnimation}>
          <h1 className="text-4xl font-bold text-center font-[family-name:var(--font-proximanova)]">
            Tap to start
          </h1>
        </motion.div>
      </main>
    </div>
  );
}
