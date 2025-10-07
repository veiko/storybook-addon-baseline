import type { Meta, StoryObj } from "@storybook/react";
import { NewlySupportedDemo } from "./components/NewlySupportedDemo";

const meta: Meta<typeof NewlySupportedDemo> = {
  title: "Baseline Addon/Newly Supported Features",
  component: NewlySupportedDemo,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          'This story demonstrates CSS features that are newly supported in modern browsers. These features should show as "newly available" in the baseline addon and may require careful consideration for production use.',
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
        "container",
        "container-type",
        "@container",
        "subgrid",
        "grid-template-columns",
        "cascade-layers",
        "@layer",
        "color-mix",
        "clamp",
        "min",
        "max",
        "has",
        ":has()",
        "accent-color",
        "backdrop-filter",
        "scroll-behavior",
        "overscroll-behavior",
      ],
    },
  },
};
