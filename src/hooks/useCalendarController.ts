import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UniqueIdentifier } from '@dnd-kit/core';
import { generateCalendar } from '../helpers/generateCalendar';

import { EventType, HolidayEvent, Task } from '../types/Task';
import { HolidayResponse } from '../types/Holiday';
import { fetchWorldwideHolidays } from '../api/api';
import { Day } from '../types/Date';
import sortBySortIndex from '../helpers/sortBySortIndex';

const useCalendarController = (resetActiveForm: () => void) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tempTasks, setTempTasks] = useState<Task[] | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [query, setQuery] = useState<string>('');
  const [holidays, setHolidays] = useState<HolidayResponse[]>([]);
  const [hasStorageRead, setHasStorageRead] = useState(false);

  const year = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const startingDayIndex = new Date(year, currentMonth, 1).getDay();
  const daysInMonth = generateCalendar(currentDate);
  const setToday = () => setCurrentDate(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWorldwideHolidays();

      if (data) {
        setHolidays(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        window.alert(`Unable to get data from localstorage, ${error}`);
      }
      setHasStorageRead(true);
    }
  }, []);

  useEffect(() => {
    if (tasks && hasStorageRead) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [hasStorageRead, tasks]);

  const changeMonth = useCallback(
    (increment: number) => {
      const newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() + increment);
      setCurrentDate(newDate);
      resetActiveForm();
    },
    [currentDate, resetActiveForm]
  );

  const preparedEventsForDay = useMemo(() => {
    const holidaysEvents = holidays.reduce<{ [key: number]: HolidayEvent[] }>(
      (acc, event) => {
        const [year, month, day] = event.date.split('-');

        if (currentMonth + 1 !== +month) {
          return acc;
        }

        const task: HolidayEvent = {
          id: uuidv4(),
          description: event.name,
          date: {
            day: +day,
            month: +month,
            year: +year,
          },
          type: EventType.Holiday,
        };

        acc[task.date.day] = acc[task.date.day]
          ? [...acc[task.date.day], task]
          : [task];

        return acc;
      },
      {}
    );

    return (tempTasks || tasks)
      .filter(
        ({ date, description }) =>
          date.month === currentMonth &&
          (!query || description.toLowerCase().includes(query.toLowerCase()))
      )
      .toSorted(sortBySortIndex)
      .reduce<{ [key: number]: Array<Task | HolidayEvent> }>((acc, task) => {
        const extendedTask = { ...task, type: EventType.Custom };

        acc[task.date.day] = acc[task.date.day]
          ? [...acc[task.date.day], extendedTask]
          : [extendedTask];

        return acc;
      }, holidaysEvents);
  }, [holidays, tempTasks, tasks, currentMonth, query]);

  const addTask = useCallback(
    (task: Omit<Task, 'id' | 'sortIndex'>) => {
      const newTasks = [
        ...tasks,
        {
          ...task,
          id: uuidv4(),
          sortIndex: (preparedEventsForDay[task.date.day] || []).filter(
            (task) => task.type !== EventType.Holiday
          ).length,
        },
      ];

      setTasks(newTasks);
    },
    [preparedEventsForDay, tasks]
  );

  const updateTask = useCallback(
    (newDescription: string, id: UniqueIdentifier) => {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, description: newDescription };
        } else {
          return task;
        }
      });

      setTasks(newTasks);
    },
    [tasks]
  );

  const deleteTask = useCallback(
    (id: UniqueIdentifier) => {
      const newTasks = tasks.filter((task) => task.id !== id);

      setTasks(newTasks);
    },
    [tasks]
  );

  const handleNewTaskSubmit = useCallback(
    (day: Day) => (description: string) => {
      if (description) {
        addTask({ description, date: day });
      }

      resetActiveForm();
    },
    [addTask, resetActiveForm]
  );

  const calendarMonthTitle = currentDate.toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

  return {
    year,
    daysInMonth,
    startingDayIndex,
    calendarMonthTitle,
    setToday,
    changeMonth,
    preparedEventsForDay,
    setQuery,
    handleNewTaskSubmit,
    updateTask,
    deleteTask,
    sourceTasks: tempTasks || tasks,
    setTasks,
    setTempTasks,
  } as const;
};

export default useCalendarController;
