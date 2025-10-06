import { defineMain } from "@storybook/react-vite/node";

const config = defineMain({
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-docs", "./local-preset.cjs"],
  framework: "@storybook/react-vite",
});

export default config;
