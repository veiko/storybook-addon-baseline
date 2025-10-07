import type { Meta, StoryObj } from "@storybook/react";
import { LimitedSupportDemo } from "./components/LimitedSupportDemo";

const meta: Meta<typeof LimitedSupportDemo> = {
  title: "Baseline Addon/Limited Support Features",
  component: LimitedSupportDemo,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          'This story demonstrates CSS features that have limited browser support or are still experimental. These features should show as "not in baseline" in the baseline addon and should be used with caution or polyfills.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    baseline: {
      features: [
        "paint",
        "worklet",
        "houdini",
        "lab",
        "lch",
        "oklab",
        "oklch",
        "anchor",
        "position-anchor",
        "inset-area",
        "anchor-name",
        "anchor-scope",
        "view-transition",
        "view-transition-name",
        "@view-transition",
        "color-scheme",
        "forced-colors",
        "prefers-reduced-motion",
        "prefers-color-scheme",
      ],
    },
  },
};
