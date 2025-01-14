import { UniqueIdentifier } from '@dnd-kit/core';
import { Day } from './Date';

export interface Task {
  id: UniqueIdentifier;
  description: string;
  date: Day;
  type?: EventType.Custom;
  sortIndex: number;
}

export interface HolidayEvent {
  id: UniqueIdentifier;
  description: string;
  date: Day;
  type: EventType.Holiday;
}

export enum EventType {
  Custom = 'custom',
  Holiday = 'holiday',
}
