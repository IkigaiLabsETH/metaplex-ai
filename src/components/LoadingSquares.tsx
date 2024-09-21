"use client";

import React from "react";
import { cn } from "@/lib/utils";
import "@/styles/LoadingSquares.css";

interface LoadingSquaresProps {
  className?: string;
}

export function LoadingSquares({ className }: LoadingSquaresProps) {
  return (
    <div className={cn("loader", className)}>
      <div className="loading-square"></div>
      <div className="loading-square"></div>
      <div className="loading-square"></div>
      <div className="loading-square"></div>
    </div>
  );
}
