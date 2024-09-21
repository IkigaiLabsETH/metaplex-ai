import React from "react";
import styles from "./neon.module.css";

export default function NeonPage() {
  return (
    <main
      className={`${styles.main} flex min-h-screen flex-col items-center justify-center bg-[#090000] p-24`}
    >
      <h1 className={`${styles.neon} ${styles.turquoise} ${styles.h1}`}>
        TRVL
      </h1>
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
