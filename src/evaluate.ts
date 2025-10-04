import { features as all } from 'web-features';
import type { BaselineStatus, BaselineTarget, BaselineResult, BaselineEvaluation } from './types';

const index = new Map(all.map(f => [f.id, f]));

export function evaluate(featureIds: string[], target: BaselineTarget): BaselineEvaluation {
  const results: BaselineResult[] = featureIds.map(id => {
    const f = index.get(id);
    const baseline = (f?.status?.baseline ?? 'none') as BaselineStatus;
    return { id, baseline };
  });

  const worst: BaselineStatus =
    results.some(r => r.baseline === 'none') ? 'none' :
    results.some(r => r.baseline === 'newly') ? 'newly' : 'widely';

  return { worst, results };
}
