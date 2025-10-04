export type BaselineStatus = 'widely' | 'newly' | 'none';

export type BaselineTarget = {
  mode: 'widelyAvailable' | 'newlyAvailable';
  date?: string;
  year?: number;
};

export type BaselineResult = {
  id: string;
  baseline: BaselineStatus;
};

export type BaselineEvaluation = {
  worst: BaselineStatus;
  results: BaselineResult[];
};

export type BaselineParameters = {
  features?: string[];
  target?: BaselineTarget;
};
