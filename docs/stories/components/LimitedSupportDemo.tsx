import React from "react";
import { DemoCard } from "./DemoCard";
import "./LimitedSupportDemo.css";

export const LimitedSupportDemo: React.FC = () => {
  return (
    <div>
      <DemoCard
        title="CSS Houdini Paint API"
        description="CSS Houdini Paint API allows custom paint worklets but has limited browser support and requires polyfills."
        baseline="limited"
      >
        <div className="houdini-demo">
          <div className="paint-worklet-box">Houdini Paint Demo</div>
        </div>
      </DemoCard>

      <DemoCard
        title="CSS Color Functions (lab, lch)"
        description="Modern color functions like lab() and lch() provide better color spaces but have limited browser support."
        baseline="limited"
      >
        <div className="color-functions-demo">
          <div className="color-box lab-color">LAB Color</div>
          <div className="color-box lch-color">LCH Color</div>
        </div>
      </DemoCard>

      <DemoCard
        title="CSS Anchor Positioning"
        description="Anchor positioning allows elements to position relative to other elements but is still experimental."
        baseline="limited"
      >
        <div className="anchor-demo">
          <div className="anchor-target">Target Element</div>
          <div className="anchor-positioned">Anchored Element</div>
        </div>
      </DemoCard>
    </div>
  );
};
