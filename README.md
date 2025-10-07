# Storybook Baseline Addon

A Storybook addon that shows Baseline compatibility badges for web features used in stories.

## Development

### Install dependencies

```bash
yarn
```

### Run Storybook

```bash
yarn dev
```

## Features

- Automatically detects CSS features used in your stories
- Shows whether features are "widely", "newly", or not in baseline
- Links to MDN documentation for each feature
- Status indicators in the Storybook toolbar

## Installation

```bash
npm install storybook-baseline
```

## Configuration

Add the addon to your `.storybook/main.js`:

```js
export default {
  addons: [
    'storybook-baseline'
  ]
};
```

## Usage

The addon automatically detects CSS features in stories and displays their baseline compatibility status.