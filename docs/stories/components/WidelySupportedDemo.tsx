import React from "react";
import { DemoCard } from "./DemoCard";
import "./WidelySupportedDemo.css";

export const WidelySupportedDemo: React.FC = () => {
  return (
    <div>
      <DemoCard
        title="Flexbox Layout"
        description="Flexbox is widely supported across all modern browsers and has been stable for years."
        baseline="widely"
      >
        <div className="flex-demo">
          <div className="flex-item">Item 1</div>
          <div className="flex-item">Item 2</div>
          <div className="flex-item">Item 3</div>
        </div>
      </DemoCard>

      <DemoCard
        title="CSS Grid"
        description="CSS Grid has excellent support in all modern browsers and is considered production-ready."
        baseline="widely"
      >
        <div className="grid-demo">
          <div className="grid-item">1</div>
          <div className="grid-item">2</div>
          <div className="grid-item">3</div>
          <div className="grid-item">4</div>
        </div>
      </DemoCard>

      <DemoCard
        title="CSS Custom Properties"
        description="CSS variables are supported in all modern browsers and provide excellent theming capabilities."
        baseline="widely"
      >
        <div className="custom-props-demo">
          <div className="themed-box primary">Primary</div>
          <div className="themed-box secondary">Secondary</div>
        </div>
      </DemoCard>
    </div>
  );
};
