import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";
import { fn } from "storybook/test";
import React from "react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    onClick: fn(),
  },
  tags: ["autodocs"],
  parameters: {},
  decorators: [
    (Story) => (
      <>
        <style>{`
          /* container queries */
          @container button-style (min-width: 200px) {
            .storybook-button { padding: 1rem; }
          }
          .storybook-button { container-type: inline-size; container-name: button-style; }
          /* pseudo-class :has */
          .storybook-button:has(span) { outline: 1px dashed currentColor; }
          /* value function color-mix */
          .storybook-button--primary { background: color-mix(in srgb, #0366d6 80%, white); }
        `}</style>
        <Story />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    primary: true,
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};
