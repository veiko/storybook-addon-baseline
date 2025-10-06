import * as csstree from "css-tree";

export type DetectedCssFeature =
  | { type: "pseudo-class"; name: string }
  | { type: "property"; name: string }
  | { type: "function"; name: string }
  | { type: "atrule"; name: string };

function isStorybookCss(ruleText: string): boolean {
  return ruleText.includes('.sb-') || 
         ruleText.includes('storybook-') || 
         ruleText.includes('[data-testid="storybook') ||
         ruleText.includes('@storybook');
}

function collectStyleSheetsCss(): string {
  let css = "";
  Array.from(document.styleSheets).forEach(sheet => {
    try {
      const rules = sheet.cssRules;
      Array.from(rules).forEach(rule => {
        const ruleText = (rule as CSSRule).cssText;
        if (!isStorybookCss(ruleText)) {
          css += ruleText + "\n";
        }
      });
    } catch {
      // skip inaccessible stylesheets
    }
  });
  return css;
}

export function collectCssText(): string {
  let css = "";
  
  // look for the story container
  const storyContainer = document.querySelector('[data-testid="storybook-root"]') || 
                        document.querySelector('#storybook-root') ||
                        document.querySelector('.sb-show-main');
  
  if (storyContainer) {
    // collect inline <style> tags from story container
    const styleTags = Array.from(storyContainer.querySelectorAll('style')) as HTMLStyleElement[];
    styleTags.forEach(tag => {
      if (tag.textContent) css += tag.textContent + "\n";
    });
    
    // collect from stylesheets (filtered)
    css += collectStyleSheetsCss();
  } else {
    // Fallback: collect from all inline styles
    const styleTags = Array.from(document.querySelectorAll('style')) as HTMLStyleElement[];
    styleTags.forEach(tag => {
      if (tag.textContent) css += tag.textContent + "\n";
    });
  }
  
  return css;
}

export function detectCssFeatures(cssText: string): DetectedCssFeature[] {
  if (!cssText) return [];
  const ast = csstree.parse(cssText, { positions: false, parseValue: true, parseRulePrelude: true });
  const features: DetectedCssFeature[] = [];

  csstree.walk(ast, (node: csstree.CssNode) => {
    // at-rules: record all
    if (node.type === "Atrule") {
      features.push({ type: "atrule", name: node.name.toLowerCase() });
    }

    // declarations: record any property, scan all value functions
    if (node.type === "Declaration") {
      const prop = node.property.toLowerCase();
      features.push({ type: "property", name: prop });
      if (node.value) {
        csstree.walk(node.value, (v) => {
          if (v.type === "Function") {
            const fn = v.name.toLowerCase();
            features.push({ type: "function", name: fn });
          }
        });
      }
    }

    // selectors: record all pseudo-classes
    if (node.type === "SelectorList") {
      csstree.walk(node, (s) => {
        if (s.type === "PseudoClassSelector") {
          const ps = s.name.toLowerCase();
          features.push({ type: "pseudo-class", name: ps });
        }
      });
    }
  });

  // de-dupe
  const key = (f: DetectedCssFeature) => `${f.type}:${f.name}`;
  const seen = new Set<string>();
  return features.filter((f) => {
    const k = key(f);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}


