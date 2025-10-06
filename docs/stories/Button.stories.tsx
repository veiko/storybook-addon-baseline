import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "./Button";
import { fn } from "storybook/test";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
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

export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};
