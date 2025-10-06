# Storybook Baseline Addon

A Storybook addon that shows Baseline compatibility badges for web features used in your stories.

## Development

### Install dependencies

```bash
yarn install
```

### Build the addon

```bash
yarn build
```

### Run Storybook

```bash
yarn storybook
```

### Publish the addon

```bash
npm publish
```

## Features

- 🎯 **Automatic Detection**: Automatically detects CSS features used in your stories
- 📊 **Baseline Status**: Shows whether features are "widely", "newly", or not in baseline
- 🔗 **MDN Links**: Clickable links to MDN documentation for each feature
- 🎨 **Visual Indicators**: Clear icons and status indicators in the Storybook toolbar

## Installation

```bash
npm install storybook-addon-baseline
```

## Configuration

Add the addon to your `.storybook/main.js`:

```js
export default {
  addons: [
    'storybook-addon-baseline'
  ]
};
```

## Usage

The addon automatically detects CSS features in your stories and displays their baseline compatibility status. No additional configuration is required!