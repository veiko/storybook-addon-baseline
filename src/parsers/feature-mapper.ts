import type { DetectedCssFeature } from "./css-parser";
import snapshot from "../data/features.snapshot.json";

// Build a fast lookup of available feature IDs from the snapshot
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
        `css-${name}`,
        // historical/alternative ids
        name === "is" ? "css-is-pseudo-class" : "",
        name === "where" ? "css-where-pseudo-class" : "",
      ].filter(Boolean);
    case "function":
      // Most CSS functions are published as css-<function>
      return [`css-${name}`];
    case "atrule": {
      if (name === "container") return ["css-container-queries"];
      if (name === "layer") return ["css-cascade-layers"];
      if (name === "scope") return ["css-scope"];
      return [`css-${name}`];
    }
    case "property": {
      if (name === "container-type" || name === "container-name") {
        return ["css-container-queries"];
      }
      return [`css-${name}`];
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
  for (const f of features) {
    const id = resolveId(f);
    if (id) ids.add(id);
  }
  return Array.from(ids);
}


