import React from "react";
import { LoadingSquares } from "@/components/LoadingSquares";

export default async function Start() {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-600 p-24">
      <LoadingSquares />
      <h1 className="text-5xl font-bold mb-4 mt-8 text-white">GM</h1>
    </main>
  );
}
