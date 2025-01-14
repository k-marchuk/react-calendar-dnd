import { DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { HolidayEvent, Task } from '../types/Task';
import { useState } from 'react';
import sortBySortIndex from '../helpers/sortBySortIndex';

const useDragEventHandlers = (
  sourceTasks: Task[],
  preparedEventsForDay: {
    [key: number]: (Task | HolidayEvent)[];
  },
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  setTempTasks: React.Dispatch<React.SetStateAction<Task[] | null>>
) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const taskId = active.id as string;
    setActiveId(taskId);
  }

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id as number | string;

    if (!over) {
      return;
    }

    let newDay = over.id as number;

    const isOverDay = over.data.current?.isDay;
    const currentTask = active.data.current?.task;

    if (!isOverDay) {
      const { date } = Object.values(preparedEventsForDay)
        .flat()
        .find((task) => task.id === over.id) as Task;

      newDay = date.day;

      if (active.id === overId) {
        return;
      }
    }

    let newTempTasks = [...sourceTasks];

    if (currentTask.date.day !== newDay) {
      if (isOverDay) {
        const newSortIndex = newTempTasks.filter(
          (task) => task.date.day === newDay
        ).length;

        newTempTasks = newTempTasks.map((task) => {
          if (task.id === active.id) {
            return {
              ...task,
              sortIndex: newSortIndex,
              date: { ...task.date, day: newDay },
            };
          } else {
            return task;
          }
        });
      } else {
        const newDayTasks = newTempTasks
          .filter((task) => task.date.day === newDay)
          .toSorted(sortBySortIndex);
        const overTaskIndex = newDayTasks.findIndex(
          (task) => task.id === over.id
        );
        newDayTasks.splice(overTaskIndex, 0, currentTask);

        newTempTasks = newTempTasks.map((task) => {
          if (task.date.day === newDay || task.id === currentTask.id) {
            const newSortIndex = newDayTasks.findIndex(
              (newDayTask) => task.id === newDayTask.id
            );

            return {
              ...task,
              sortIndex: newSortIndex,
              date: { ...task.date, day: newDay },
            };
          } else {
            return task;
          }
        });
      }

      let index = 0;

      newTempTasks = newTempTasks.toSorted(sortBySortIndex).map((task) => {
        if (currentTask.date.day === task.date.day) {
          return { ...task, sortIndex: index++ };
        } else {
          return task;
        }
      });
    } else {
      const newDayTasks = newTempTasks
        .filter(
          (task) => task.date.day === newDay && task.id !== currentTask.id
        )
        .toSorted(sortBySortIndex);

      let overTaskIndex = newDayTasks.length;

      if (!isOverDay) {
        overTaskIndex = newDayTasks.findIndex((task) => task.id === over.id);
      }

      newDayTasks.splice(overTaskIndex, 0, currentTask);

      newTempTasks = newTempTasks.map((task) => {
        if (task.date.day === newDay || task.id === currentTask.id) {
          const newSortIndex = newDayTasks.findIndex(
            (newDayTask) => task.id === newDayTask.id
          );

          return {
            ...task,
            sortIndex: newSortIndex,
          };
        } else {
          return task;
        }
      });
    }

    setTempTasks(newTempTasks);
  };

  const handleDragEnd = () => {
    setActiveId(null);

    if (sourceTasks) {
      setTasks(sourceTasks);
      setTempTasks(null);
    }
  };

  const dragTask = activeId
    ? sourceTasks?.find(({ id }) => id === activeId)
    : null;

  return {
    activeId,
    dragTask,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};

export default useDragEventHandlers;
