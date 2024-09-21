"use client";

import React from "react";
import "@/styles/cubeAnimation.scss";

const CubeAnimation: React.FC = () => {
  return (
    <div className="cube-animation-wrapper">
      <div className="container">
        {[1, 2, 3].map((height) => (
          <React.Fragment key={`h${height}`}>
            {[1, 2, 3].map((width) => (
              <React.Fragment key={`h${height}w${width}`}>
                {[1, 2, 3].map((length) => (
                  <div
                    key={`h${height}w${width}l${length}`}
                    className={`cube h${height} w${width} l${length}`}
                  >
                    <div className="face right"></div>
                    <div className="face left"></div>
                    <div className="face top"></div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CubeAnimation;
