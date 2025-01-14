import { UniqueIdentifier } from '@dnd-kit/core';

export interface Day {
  day: number;
  month: number;
  year: number;
}

export interface ActiveDay {
  day: Day | null;
  taskId: UniqueIdentifier | null;
}
