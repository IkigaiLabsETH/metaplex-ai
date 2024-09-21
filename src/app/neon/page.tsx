import React from "react";
import styles from "./neon.module.css";

export default function NeonPage() {
  return (
    <main
      className={`${styles.main} flex min-h-screen flex-col items-center justify-center bg-[#090000] p-24`}
    >
      <h2 className={`${styles.neon} ${styles.turquoise} ${styles.h2} mb-4`}>
        LIVE THE LIFE
      </h2>
      <a
        href="https://livethelife.tv"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.neon} ${styles.pink} ${styles.h1} mb-8 block text-center no-underline`}
      >
        ENTER
      </a>
      <a
        className={`${styles.link} fixed bottom-4 right-4 text-white text-sm opacity-70 hover:opacity-100 transition-opacity`}
        href="https://livethelife.tv"
        target="_blank"
        rel="noopener noreferrer"
      >
        LiveTheLifeTV
      </a>
    </main>
  );
}
