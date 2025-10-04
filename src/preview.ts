import { addons } from "storybook/preview-api";
import { CHANNEL_EVENT, PARAM_KEY } from "./constants";
import { evaluate } from "./evaluate";

export const decorators = [
  (Story: any, ctx: any) => {
    const params = ctx.parameters[PARAM_KEY] || {};
    const features: string[] = params.features || [];
    
    if (features.length) {
      const result = evaluate(features, params.target || { mode: 'widelyAvailable' });
      addons.getChannel().emit(CHANNEL_EVENT, { 
        storyId: ctx.id, 
        ...result 
      });
    }
    
    return Story();
  },
];
