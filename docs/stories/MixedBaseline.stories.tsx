import type { Meta, StoryObj } from "@storybook/react";
import { MixedBaselineDemo } from "./components/MixedBaselineDemo";

const meta: Meta<typeof MixedBaselineDemo> = {
  title: "Baseline Addon/Mixed Baseline Support",
  component: MixedBaselineDemo,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "This story demonstrates a realistic web application that uses a mix of widely supported, newly supported, and experimental CSS features. The baseline addon will show different support levels for different features.",
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
        // Widely supported
        "display",
        "flex",
        "grid",
        "gap",
        "justify-content",
        "align-items",
        "background",
        "linear-gradient",
        "border-radius",
        "box-shadow",
        "padding",
        "margin",
        "color",
        "font-weight",
        "text-align",
        "transition",
        "transform",
        "hover",
        ":hover",

        // Newly supported
        "container",
        "container-type",
        "@container",
        "subgrid",
        "color-mix",
        "clamp",
        "has",
        ":has()",
        "backdrop-filter",

        // Limited support
        "paint",
        "worklet",
        "lab",
        "lch",
        "anchor",
        "position-anchor",
        "inset-area",
        "view-transition",
        "view-transition-name",
      ],
    },
  },
};
