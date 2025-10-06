import React from "react";
import { addons, types } from "storybook/manager-api";
import { Tool } from "./components/Tool";
import { ADDON_ID, TOOL_ID } from "./constants";

// register the addon
addons.register(ADDON_ID, () => {
  // register the baseline tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Baseline",
    match: ({ viewMode }) => viewMode === "story",
    render: () => <Tool />,
  });
});
