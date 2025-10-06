import type { BaselineStatus, BaselineTarget, BaselineResult, BaselineEvaluation } from './types';
import snapshot from './data/features.snapshot.json';

// TODO: support targets
export function evaluate(featureIds: string[], _target: BaselineTarget): BaselineEvaluation {
  const results: BaselineResult[] = featureIds.map(id => {
    const baseline = (snapshot as Record<string, BaselineStatus>)[id] ?? 'none';
    return { id, baseline };
  });

  const worst: BaselineStatus =
    results.some(r => r.baseline === 'none') ? 'none' :
    results.some(r => r.baseline === 'newly') ? 'newly' : 'widely';

  return { worst, results };
}
