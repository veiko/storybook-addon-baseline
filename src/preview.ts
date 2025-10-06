import { addons } from "storybook/preview-api";
import { CHANNEL_EVENT, PARAM_KEY } from "./constants";
import { evaluate } from "./evaluate";
import { collectSameOriginCssText, detectCssFeatures } from "./parsers/css-parser";
import { mapDetectedToFeatureIds } from "./parsers/feature-mapper";

export const decorators = [
  (Story: any, ctx: any) => {
    const params = ctx.parameters[PARAM_KEY] || {};
    const manualFeatures: string[] = params.features || [];

    const resultFromManual = () => {
      const res = evaluate(manualFeatures, params.target || { mode: 'widelyAvailable' });
      addons.getChannel().emit(CHANNEL_EVENT, { storyId: ctx.id, ...res });
    };

    const el = Story();

    // Auto-detect CSS after render (schedule after current frame to ensure styles are in DOM)
    setTimeout(async () => {
      try {
        const css = collectSameOriginCssText();
        const detected = detectCssFeatures(css);
        const autoIds = mapDetectedToFeatureIds(detected);
        const finalIds = autoIds.length ? autoIds : manualFeatures;
        if (finalIds.length) {
          const res = evaluate(finalIds, params.target || { mode: 'widelyAvailable' });
          addons.getChannel().emit(CHANNEL_EVENT, { storyId: ctx.id, ...res });
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[baseline] detection error', err);
        if (manualFeatures.length) resultFromManual();
      }
    }, 0);

    return el;
  },
];
