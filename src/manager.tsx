import React from "react";
import { addons, types } from "storybook/manager-api";
import { Tool } from "./components/Tool";
import { ADDON_ID, TOOL_ID } from "./constants";

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the baseline tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Baseline",
    match: ({ viewMode }) => viewMode === "story" || viewMode === "docs",
    render: () => <Tool />,
  });
});
