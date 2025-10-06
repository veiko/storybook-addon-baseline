import { addons } from "storybook/preview-api";
import { CHANNEL_EVENT, PARAM_KEY } from "./constants";
import { evaluate } from "./evaluate";
import { collectCssText, detectCssFeatures } from "./parsers/css-parser";
import { mapDetectedToFeatureIds } from "./parsers/feature-mapper";

// cache results per story
const storyResults = new Map<string, any>();

export const decorators = [
  (Story: any, ctx: any) => {
    const params = ctx.parameters[PARAM_KEY] || {};
    const manualFeatures: string[] = params.features || [];

    const resultFromManual = () => {
      const res = evaluate(manualFeatures, params.target || { mode: 'widelyAvailable' });
      addons.getChannel().emit(CHANNEL_EVENT, { storyId: ctx.id, ...res });
    };

    const el = Story();

    // auto-detect CSS after render
    // schedule after current frame to ensure styles are in DOM
    setTimeout(async () => {
      try {
        // Check if we already have results for this story
        if (storyResults.has(ctx.id)) {
          const cachedResult = storyResults.get(ctx.id);
          const channel = addons.getChannel();
          if (channel) {
            channel.emit(CHANNEL_EVENT, { storyId: ctx.id, ...cachedResult });
          }
          return;
        }
        
        const css = collectCssText();
        const detected = detectCssFeatures(css);
        const autoIds = mapDetectedToFeatureIds(detected);
        const finalIds = autoIds.length ? autoIds : manualFeatures;
        if (finalIds.length) {
          const res = evaluate(finalIds, params.target || { mode: 'widelyAvailable' });
          
          // cache results
          storyResults.set(ctx.id, res);
          
          const channel = addons.getChannel();
          if (channel) {
            channel.emit(CHANNEL_EVENT, { storyId: ctx.id, ...res });
          }
        } else {
          if (manualFeatures.length) resultFromManual();
        }
      } catch (err) {
        console.error('[baseline] Detection error:', err);
        if (manualFeatures.length) resultFromManual();
      }
    }, 0);

    return el;
  },
];
