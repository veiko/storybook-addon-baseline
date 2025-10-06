import type { DetectedCssFeature } from "./css-parser";
import snapshot from "../data/features.snapshot.json";

// build a lookup of feature IDs from the snapshot
const knownIds = new Set(Object.keys(snapshot as Record<string, string>));

function kebab(str: string): string {
  return String(str).trim().toLowerCase();
}

function candidateIdsFor(feature: DetectedCssFeature): string[] {
  const name = kebab(feature.name);
  switch (feature.type) {
    case "pseudo-class":
      // Common pseudo-classes that map 1:1
      return [
        name, // e.g., "has" -> "has"
        `css-${name}`, // fallback
        // historical/alternative ids
        name === "is" ? "css-is-pseudo-class" : "",
        name === "where" ? "css-where-pseudo-class" : "",
      ].filter(Boolean);
    case "function":
      // Most CSS functions are published as css-<function>
      return [
        name, // e.g., "color-mix" -> "color-mix"
        `css-${name}`, // fallback
      ];
    case "atrule": {
      if (name === "container") return ["container-queries", "css-container-queries"];
      if (name === "layer") return ["cascade-layers", "css-cascade-layers"];
      if (name === "scope") return ["scope", "css-scope"];
      return [name, `css-${name}`];
    }
    case "property": {
      if (name === "container-type" || name === "container-name") {
        return ["container-queries", "css-container-queries"];
      }
      return [name, `css-${name}`];
    }
    default:
      return [];
  }
}

function resolveId(feature: DetectedCssFeature): string | undefined {
  for (const cand of candidateIdsFor(feature)) {
    if (knownIds.has(cand)) return cand;
  }
  return undefined;
}

export function mapDetectedToFeatureIds(features: DetectedCssFeature[]): string[] {
  const ids = new Set<string>();
  const unknown: DetectedCssFeature[] = [];
  for (const f of features) {
    const id = resolveId(f);
    if (id) {
      ids.add(id);
    } else {
      unknown.push(f);
    }
  }
  if (unknown.length && typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('[baseline] unknown CSS features (not mapped)', unknown.slice(0, 10));
  }
  return Array.from(ids);
}


