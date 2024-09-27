"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./neon.module.css";

export default function NeonPageContent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (mainRef.current) {
        const rect = mainRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <main
      ref={mainRef}
      className={`${styles.main} flex min-h-screen flex-col items-center justify-center bg-[#090000] p-24 relative overflow-hidden`}
    >
      <div
        className={styles.arealight}
        style={
          {
            "--x": `${mousePosition.x}px`,
            "--y": `${mousePosition.y}px`,
          } as React.CSSProperties
        }
      ></div>
      <h2 className={`${styles.neon} ${styles.turquoise} ${styles.h2} mb-4`}>
        AI AGENT
      </h2>
      <a
        href="https://livethelife.tv/light-paper/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.neon} ${styles.pink} ${styles.h1} mb-8 block text-center no-underline`}
      >
        NFT's Bridging Thoughts & Actions
      </a>
      <a
        href="https://livethelife.tv/light-paper/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.neon} ${styles.pink} ${styles.h1} mb-8 block text-center no-underline`}
      >
        Visit LiveTheLifeTV and Read More
      </a>
    </main>
  );
}
