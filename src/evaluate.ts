import type { BaselineStatus, BaselineTarget, BaselineResult, BaselineEvaluation } from './types';

// Mock baseline data for demonstration
// In a real implementation, this would come from the web-features dataset
const mockBaselineData: Record<string, BaselineStatus> = {
  'css-has': 'widely',
  'view-transitions': 'newly',
  'css-container-queries': 'newly',
  'css-cascade-layers': 'widely',
  'css-subgrid': 'newly',
  'css-logical-properties': 'widely',
  'css-color-mix': 'newly',
  'css-anchor-positioning': 'none',
  'css-scope': 'none',
  'css-nesting': 'newly',
};

export function evaluate(featureIds: string[], target: BaselineTarget): BaselineEvaluation {
  const results: BaselineResult[] = featureIds.map(id => {
    const baseline = mockBaselineData[id] ?? 'none';
    return { id, baseline };
  });

  const worst: BaselineStatus =
    results.some(r => r.baseline === 'none') ? 'none' :
    results.some(r => r.baseline === 'newly') ? 'newly' : 'widely';

  return { worst, results };
}
