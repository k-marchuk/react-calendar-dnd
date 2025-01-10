import { Day } from './Date';

export interface Task {
  id: string;
  description: string;
  date: Day;
  type?: EventType;
}

export enum EventType {
  Custom = 'custom',
  Holiday = 'holiday',
}
