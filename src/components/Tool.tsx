import React, { memo, useState, useEffect } from "react";
import { useChannel } from "storybook/manager-api";
import {
  IconButton,
  WithTooltip,
  TooltipMessage,
} from "storybook/internal/components";
import {
  BaselineWidelyIcon,
  BaselineNewlyIcon,
  BaselineLimitedIcon,
} from "./BaselineIcons";
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
    status === "widely"
      ? BaselineWidelyIcon
      : status === "newly"
        ? BaselineNewlyIcon
        : BaselineLimitedIcon;

  const [urls, setUrls] = useState<Record<string, string>>({});

  // Generate URLs for all features
  useEffect(() => {
    if (results.length > 0) {
      results.forEach(async (r) => {
        if (!urls[r.id]) {
          // TODO: better urls
          const url = `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(r.id)}`;
          setUrls((prev) => ({ ...prev, [r.id]: url }));
        }
      });
    }
  }, [results, urls]);

  const tooltipContent =
    results.length > 0
      ? results
          .sort((a, b) => {
            // Sort by baseline status: none -> newly -> widely
            const statusOrder = { none: 0, newly: 1, widely: 2 };
            return statusOrder[a.baseline] - statusOrder[b.baseline];
          })
          .map((r) => {
            const IconComponent =
              r.baseline === "widely"
                ? BaselineWidelyIcon
                : r.baseline === "newly"
                  ? BaselineNewlyIcon
                  : BaselineLimitedIcon;
            return {
              text: `${r.id}: ${r.baseline}`,
              icon: IconComponent,
              url:
                urls[r.id] ||
                `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(r.id)}`,
            };
          })
      : [];

  return (
    <WithTooltip
      placement="bottom"
      trigger="click"
      tooltip={
        <TooltipMessage
          title={title}
          desc={
            tooltipContent.length > 0 ? (
              <div>
                {tooltipContent.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    <item.icon />
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "inherit",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.text}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              "No baseline features specified"
            )
          }
        />
      }
    >
      <IconButton key={TOOL_ID} active={status !== "widely"} title={title}>
        <IconComponent />
      </IconButton>
    </WithTooltip>
  );
});
