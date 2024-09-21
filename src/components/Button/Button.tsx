"use client";

import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import styles from "./Button.module.css";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "dark" | "white";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

function getPoint(
  point: number[],
  i: number,
  a: number[][],
  smoothing: number
) {
  const cp = (
    current: number[],
    previous: number[],
    next: number[],
    reverse: boolean
  ) => {
    const p = previous || current;
    const n = next || current;
    const o = {
      length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
      angle: Math.atan2(n[1] - p[1], n[0] - p[0]),
    };
    const angle = o.angle + (reverse ? Math.PI : 0);
    const length = o.length * smoothing;
    return [
      current[0] + Math.cos(angle) * length,
      current[1] + Math.sin(angle) * length,
    ];
  };
  const cps = cp(a[i - 1], a[i - 2], point, false);
  const cpe = cp(point, a[i - 1], a[i + 1], true);
  return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
}

function getPath(update: number, smoothing: number, pointsNew?: number[][]) {
  const points = pointsNew
    ? pointsNew
    : [
        [4, 12],
        [12, update],
        [20, 12],
      ];
  const d = points.reduce(
    (acc, point, i, a) =>
      i === 0
        ? `M ${point[0]},${point[1]}`
        : `${acc} ${getPoint(point, i, a, smoothing)}`,
    ""
  );
  return `<path d="${d}" />`;
}

const Button = memo(function Button({
  children,
  className,
  variant = "default",
  isLoading = false,
  icon,
  ...props
}: ButtonProps) {
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const duration = 3000;
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.style.setProperty("--duration", `${duration}ms`);
    }
  }, []);

  useEffect(() => {
    if (loading && svgRef.current) {
      const svgPath = {
        y: 20,
        smoothing: 0,
      };

      const updatePath = () => {
        if (svgRef.current) {
          svgRef.current.innerHTML = getPath(svgPath.y, svgPath.smoothing);
        }
      };

      animationRef.current = gsap
        .timeline()
        .to(svgPath, {
          smoothing: 0.3,
          duration: (duration * 0.065) / 1000,
          onUpdate: updatePath,
        })
        .to(
          svgPath,
          {
            y: 12,
            duration: (duration * 0.265) / 1000,
            ease: "elastic.out(1.12, 0.4)",
            onUpdate: updatePath,
          },
          "+=0.065"
        )
        .call(
          () => {
            if (svgRef.current) {
              svgRef.current.innerHTML = getPath(0, 0, [
                [3, 14],
                [8, 19],
                [21, 6],
              ]);
            }
          },
          [],
          duration / 2
        )
        .call(() => setLoading(false), [], duration);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [loading, duration]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!loading) {
        setLoading(true);
        if (props.onClick) {
          props.onClick(e);
        }
      }
    },
    [loading, props.onClick]
  );

  const variantClasses = {
    default: styles.default,
    dark: styles.dark,
    white: styles.whiteSingle,
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        styles.button,
        variantClasses[variant],
        loading ? styles.loading : "",
        className
      )}
      disabled={isLoading || loading}
      onClick={handleClick}
      {...props}
    >
      <ul className={styles.textList}>
        <li>{children}</li>
        <li>Loading</li>
        <li>Success!</li>
      </ul>
      <div className={styles.iconContainer}>
        <svg ref={svgRef} viewBox="0 0 24 24" className={styles.icon}></svg>
      </div>
    </button>
  );
});

export { Button };
