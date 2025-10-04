import React, { memo, useState, useEffect } from "react";
import { useChannel } from "storybook/manager-api";
import {
  IconButton,
  WithTooltip,
  TooltipMessage,
} from "storybook/internal/components";
import { CheckIcon, TimeIcon, AlertIcon } from "@storybook/icons";
import { TOOL_ID, CHANNEL_EVENT } from "../constants";
import type { BaselineStatus, BaselineResult } from "../types";

export const Tool = memo(function BaselineTool() {
  const [baselineData, setBaselineData] = useState<{
    status: BaselineStatus;
    results: BaselineResult[];
  }>({ status: "none", results: [] });

  useChannel({
    [CHANNEL_EVENT]: (data: {
      storyId: string;
      worst: BaselineStatus;
      results: BaselineResult[];
    }) => {
      setBaselineData({
        status: data.worst,
        results: data.results,
      });
    },
  });

  const { status, results } = baselineData;

  const title =
    status === "widely"
      ? "Baseline: Widely available"
      : status === "newly"
        ? "Baseline: Newly available"
        : "Baseline: Not in Baseline";

  const IconComponent =
    status === "widely" ? CheckIcon : status === "newly" ? TimeIcon : AlertIcon;

  const tooltipContent =
    results.length > 0
      ? results.map((r) => `${r.id}: ${r.baseline}`).join("\n")
      : "No baseline features specified";

  return (
    <WithTooltip
      placement="bottom"
      trigger="click"
      tooltip={<TooltipMessage title={title} desc={tooltipContent} />}
    >
      <IconButton key={TOOL_ID} active={status !== "widely"} title={title}>
        <IconComponent />
      </IconButton>
    </WithTooltip>
  );
});
