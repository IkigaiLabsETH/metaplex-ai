"use client";

import React from "react";
import styles from "@/styles/404.module.scss";

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.glitchText} title="404">
        404
      </div>
    </div>
  );
}
