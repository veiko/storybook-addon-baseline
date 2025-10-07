// id for the addon
export const ADDON_ID = "storybook-baseline";
// used to register the addon
export const TOOL_ID = `${ADDON_ID}/tool`;
// name of the parameter that will be used to configure the addon
export const PARAM_KEY = "baseline";
// event that will be used to communicate from the preview to the manager with the addon
export const CHANNEL_EVENT = `${ADDON_ID}/result`;
