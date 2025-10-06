import React from "react";
import widelyUrl from "../assets/baseline-widely-icon.svg";
import newlyUrl from "../assets/baseline-newly-icon.svg";
import limitedUrl from "../assets/baseline-limited-icon.svg";

export const BaselineWidelyIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <img
    className={className}
    src={widelyUrl}
    width={16}
    height={16}
    alt="Baseline widely available"
  />
);

export const BaselineNewlyIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <img
    className={className}
    src={newlyUrl}
    width={16}
    height={16}
    alt="Baseline newly available"
  />
);

export const BaselineLimitedIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <img
    className={className}
    src={limitedUrl}
    width={16}
    height={16}
    alt="Baseline limited availability"
  />
);
