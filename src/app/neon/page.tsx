"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import React, { useState, useEffect, useRef } from "react";

const DynamicNeonPage = dynamic(() => import("./NeonPageContent"), {
  ssr: false,
});

export default function NeonPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicNeonPage />
    </Suspense>
  );
}
