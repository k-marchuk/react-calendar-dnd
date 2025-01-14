import { Task } from '../types/Task';

export default (a: Task, b: Task) => a.sortIndex - b.sortIndex;
