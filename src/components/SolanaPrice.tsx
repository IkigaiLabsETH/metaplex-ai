"use client";

import { useState, useEffect } from "react";
import { getSOLPrice } from "@/lib/getSOLPrice";

const generateRandomKeyframes = (name: string) => {
  const randomPosition = () => `${Math.random() * 100}vw`;
  const randomOffset = () => `${Math.random() * 100}vh`;

  const startEndPosition = `${randomPosition()}, ${randomOffset()}`;
  const midPosition1 = `${randomPosition()}, ${randomOffset()}`;
  const midPosition2 = `${randomPosition()}, ${randomOffset()}`;
  const midPosition3 = `${randomPosition()}, ${randomOffset()}`;

  return `
    @keyframes ${name} {
      0% { transform: translate(${startEndPosition}); }
      25% { transform: translate(${midPosition1}); }
      50% { transform: translate(${midPosition2}); }
      75% { transform: translate(${midPosition3}); }
      100% { transform: translate(${startEndPosition}); }
    }
  `;
};

interface BlobProps {
  className: string;
  animationName: string;
  duration: string;
  initialPosition: string;
}

function Blob({
  className,
  animationName,
  duration,
  initialPosition,
}: BlobProps) {
  return (
    <div
      className={`blob ${className}`}
      style={{
        animation: `${animationName} ${duration} infinite ease-in-out`,
        transform: `translate(${initialPosition})`,
      }}
    ></div>
  );
}

export function SolanaPrice() {
  const [solPrice, setSolPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const price = await getSOLPrice();
        setSolPrice(Math.round(price));
      } catch (err) {
        setError("Failed to fetch Solana price");
        console.error(err);
      }
    };
    fetchPrice();

    const style = document.createElement("style");
    style.innerHTML = `
      ${generateRandomKeyframes("animateBlob1")}
      ${generateRandomKeyframes("animateBlob2")}
      ${generateRandomKeyframes("animateBlob3")}
      ${generateRandomKeyframes("animateBlob4")}
      ${generateRandomKeyframes("animateBlob5")}
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const randomPosition = () =>
    `${Math.random() * 100}vw, ${Math.random() * 100}vh`;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="z-10 text-center">
        <h1 className="text-4xl mb-8 font-bold text-white">Solana Price</h1>
        {error ? (
          <p className="text-2xl text-red-300">{error}</p>
        ) : solPrice !== null ? (
          <p className="text-8xl font-bold text-white">${solPrice}</p>
        ) : (
          <p className="text-2xl text-white">Loading...</p>
        )}
      </div>
      <div className="absolute inset-0 -z-10">
        <Blob
          className="absolute bg-[#FFA07A] w-[500px] h-[500px] blur-3xl scale-75 md:scale-100 mix-blend-multiply opacity-70"
          animationName="animateBlob1"
          duration="12s"
          initialPosition={randomPosition()}
        />
        <Blob
          className="absolute bg-[#98FB98] w-[500px] h-[500px] blur-3xl scale-75 md:scale-100 mix-blend-multiply opacity-70"
          animationName="animateBlob2"
          duration="15s"
          initialPosition={randomPosition()}
        />
        <Blob
          className="absolute bg-[#87CEFA] w-[500px] h-[500px] blur-3xl scale-75 md:scale-100 mix-blend-multiply opacity-70"
          animationName="animateBlob3"
          duration="18s"
          initialPosition={randomPosition()}
        />
        <Blob
          className="absolute bg-[#FFD700] w-[500px] h-[500px] blur-3xl scale-75 md:scale-100 mix-blend-multiply opacity-70"
          animationName="animateBlob4"
          duration="21s"
          initialPosition={randomPosition()}
        />
        <Blob
          className="absolute bg-[#BA55D3] w-[500px] h-[500px] blur-3xl scale-75 md:scale-100 mix-blend-multiply opacity-70"
          animationName="animateBlob5"
          duration="24s"
          initialPosition={randomPosition()}
        />
      </div>
    </div>
  );
}
