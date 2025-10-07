import type { Meta, StoryObj } from "@storybook/react";
import { WidelySupportedDemo } from "./components/WidelySupportedDemo";

const meta: Meta<typeof WidelySupportedDemo> = {
  title: "Baseline Addon/Widely Supported Features",
  component: WidelySupportedDemo,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          'This story demonstrates CSS features that have wide browser support and are considered safe to use in production. These features should show as "widely available" in the baseline addon.',
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
        "display",
        "flex",
        "grid",
        "gap",
        "justify-content",
        "align-items",
        "background",
        "background-image",
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
        "--custom-properties",
        "var()",
      ],
    },
  },
};
