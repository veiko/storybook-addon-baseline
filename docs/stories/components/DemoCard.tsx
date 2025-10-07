import React from "react";
import "./DemoCard.css";

interface DemoCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  baseline?: "widely" | "newly" | "limited";
}

export const DemoCard: React.FC<DemoCardProps> = ({
  title,
  description,
  children,
  baseline,
}) => {
  return (
    <div className={`demo-card ${baseline ? `baseline-${baseline}` : ""}`}>
      <div className="demo-card-header">
        <h3>{title}</h3>
        {baseline && (
          <span className={`baseline-badge baseline-${baseline}`}>
            {baseline === "widely"
              ? "Widely Supported"
              : baseline === "newly"
                ? "Newly Supported"
                : "Limited Support"}
          </span>
        )}
      </div>
      <p className="demo-description">{description}</p>
      <div className="demo-content">{children}</div>
    </div>
  );
};
