import React from "react";
import { DemoCard } from "./DemoCard";
import "./NewlySupportedDemo.css";

export const NewlySupportedDemo: React.FC = () => {
  return (
    <div>
      <DemoCard
        title="CSS Container Queries"
        description="Container queries are newly supported and allow components to respond to their container size rather than viewport size."
        baseline="newly"
      >
        <div className="container-query-demo">
          <div className="container-small">
            <div className="responsive-card">Small Container</div>
          </div>
          <div className="container-large">
            <div className="responsive-card">Large Container</div>
          </div>
        </div>
      </DemoCard>

      <DemoCard
        title="CSS Cascade Layers"
        description="Cascade layers provide better control over CSS specificity and are newly available in modern browsers."
        baseline="newly"
      >
        <div className="cascade-demo">
          <div className="layered-element">Cascade Layer Demo</div>
        </div>
      </DemoCard>

      <DemoCard
        title="CSS Subgrid"
        description="Subgrid allows grid items to participate in their parent's grid layout, providing more flexible nested grids."
        baseline="newly"
      >
        <div className="subgrid-demo">
          <div className="subgrid-item">
            <div className="subgrid-content">Subgrid Item 1</div>
            <div className="subgrid-content">Subgrid Item 2</div>
          </div>
          <div className="subgrid-item">
            <div className="subgrid-content">Subgrid Item 3</div>
            <div className="subgrid-content">Subgrid Item 4</div>
          </div>
        </div>
      </DemoCard>
    </div>
  );
};
