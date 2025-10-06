import * as csstree from "css-tree";

export type DetectedCssFeature =
  | { type: "pseudo-class"; name: string }
  | { type: "property"; name: string }
  | { type: "function"; name: string }
  | { type: "atrule"; name: string };

export function collectSameOriginCssText(): string {
  let css = "";
  // Include inline <style> tags directly (safe and avoids cssRules access issues)
  const styleTags = Array.from(document.querySelectorAll('style')) as HTMLStyleElement[];
  for (const tag of styleTags) {
    if (tag.textContent) css += tag.textContent + "\n";
  }
  // Also try reading CSSStyleSheet.cssRules for same-origin sheets
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      const rules = (sheet as CSSStyleSheet).cssRules;
      for (const rule of Array.from(rules)) {
        css += (rule as CSSRule).cssText + "\n";
      }
    } catch {
      // Cross-origin or inaccessible stylesheet; skip
      continue;
    }
  }
  return css;
}

export function detectCssFeatures(cssText: string): DetectedCssFeature[] {
  if (!cssText) return [];
  const ast = csstree.parse(cssText, { positions: false, parseValue: true, parseRulePrelude: true });
  const features: DetectedCssFeature[] = [];

  csstree.walk(ast, (node) => {
    // At-rules: record all
    if (node.type === "Atrule") {
      const name = node.name.toLowerCase();
      features.push({ type: "atrule", name });
    }

    // Declarations: record any property; scan all value functions
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

    // Selectors: record all pseudo-classes
    if (node.type === "SelectorList") {
      csstree.walk(node, (s) => {
        if (s.type === "PseudoClassSelector") {
          const ps = s.name.toLowerCase();
          features.push({ type: "pseudo-class", name: ps });
        }
      });
    }
  });

  // De-duplicate
  const key = (f: DetectedCssFeature) => `${f.type}:${f.name}`;
  const seen = new Set<string>();
  return features.filter((f) => {
    const k = key(f);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}


