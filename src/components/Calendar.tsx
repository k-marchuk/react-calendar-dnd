import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import CalendarDay from './CalendarDay';
import { generateCalendar } from '../helpers/generateCalendar';
import { Day } from '../types/Date';
import CalendarEmptyDay from './CalendarEmptyDay';
import { EventType, Task } from '../types/Task';
import MonthNavigationButton from './MonthNavigationButton';
import { Holiday } from '../types/Holiday';
import { fetchWorldwideHolidays } from '../api/api';

const CalendarContainer = styled.div`
  background-color: #edeff1;
  border-radius: 8px;
  overflow: hidden;
`;

const CalendarHeader = styled.div`
  display: flex;
  padding: 20px;
  background-color: #edeff1;
  color: #343435;
  font-weight: bold;
  font-size: 18px;
`;

const MonthsToggle = styled.div`
  display: flex;
  gap: 6px;
  width: max-content;
`;

const StyledInputSearch = styled.input`
  border: 1px solid gray;
  border-radius: 4px;
  padding-inline: 4px;
  min-width: 200px;
`;

const StyledFilterIcon = styled.span`
  display: flex;
  padding: 6px;
`;

const CurrentMonth = styled.span`
  margin: auto;
`;

const Weekday = styled.div`
  color: #5f6061;
  font-weight: bold;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 6px;
  padding: 10px;
`;

const TodayButton = styled.div`
  background-color: #e2e4e6;
  line-height: 28px;
  padding: 4px 18px;
  margin-right: 20px;
  border-radius: 4px;
  border: 0 solid gray;
  cursor: pointer;
  box-shadow: 0 2px 2px 0px rgba(184, 180, 184, 1);
  transition: background-color 0.3s ease, transform 0.1s ease;

  &:hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }

  &:active {
    background-color: rgba(2, 73, 143, 0.11);
    transform: scale(0.95);
  }

  &:focus {
    outline: 2px solid #6c7c7f;
  }
`;

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [chosenDay, setChosenDay] = useState<Day | null>(null);
  const [editedTaskId, setEditedTaskId] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const [holidays, setHolidays] = useState<Holiday[] | undefined>([]);
  const [tasks, setTasks] = useState<Omit<Task[], 'type'>>([]);

  const year = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, currentMonth, 1);
  const startingDayIndex = firstDayOfMonth.getDay();

  const daysInMonth = generateCalendar(currentDate);

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + increment);
    setCurrentDate(newDate);
    setChosenDay(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWorldwideHolidays();
      setHolidays(data);
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
    }
  }, []);

  useEffect(() => {
    if (tasks.length) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addNewTask = (task: Omit<Task, 'id'>) => {
    const newTasks = [...tasks, { ...task, id: uuidv4() }];

    setTasks(newTasks);
  };

  const editTask = (newDescription: string, id: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, description: newDescription };
      } else {
        return task;
      }
    });

    setTasks(newTasks);
  };

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);

    setTasks(newTasks);
  };

  const preparedEventsForDay = useMemo(() => {
    const preparedHolidays = holidays?.reduce((acc, event) => {
      const [year, month, day] = event.date.split('-');

      if (currentMonth + 1 !== +month) {
        return acc;
      }

      const holiday: Task = {
        id: uuidv4(),
        description: event.name,
        date: {
          day: +day,
          month: +month,
          year: +year,
        },
        type: EventType.Holiday,
      };

      if (acc[holiday.date.day]) {
        acc[holiday.date.day].push(holiday);
      } else {
        acc[holiday.date.day] = [holiday];
      }

      return acc;
    }, {} as { [key: number]: Task[] });

    return tasks
      .filter(
        ({ date, description }) =>
          date.month === currentMonth && (!query || description.includes(query))
      )
      .reduce((acc, task) => {
        const extendedTask = { ...task, type: EventType.Custom };

        if (acc[task.date.day]) {
          acc[task.date.day].push(extendedTask);
        } else {
          acc[task.date.day] = [extendedTask];
        }

        return acc;
      }, preparedHolidays as { [key: number]: Task[] });
  }, [holidays, tasks, currentMonth, query]);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <TodayButton onClick={() => setCurrentDate(new Date())}>
          Today
        </TodayButton>
        <MonthsToggle>
          <MonthNavigationButton
            onMonthChange={changeMonth}
            direction={'Up'}
          ></MonthNavigationButton>
          <MonthNavigationButton
            onMonthChange={changeMonth}
            direction={'Down'}
          ></MonthNavigationButton>
        </MonthsToggle>

        <CurrentMonth>
          {currentDate.toLocaleDateString('en-GB', {
            month: 'long',
            year: 'numeric',
          })}
        </CurrentMonth>
        <StyledFilterIcon className="material-symbols-outlined">
          filter_list
        </StyledFilterIcon>
        <StyledInputSearch
          placeholder="Search by task description..."
          onChange={(event) => {
            setQuery(event.target.value);
            setChosenDay(null);
            setEditedTaskId(null);
          }}
        />
      </CalendarHeader>

      <CalendarGrid>
        {WEEKDAYS.map((weekday) => {
          return <Weekday key={weekday}>{weekday}</Weekday>;
        })}
        {Array.from({ length: startingDayIndex }).map((_, index: number) => {
          return <CalendarEmptyDay key={`empty-${index}`} />;
        })}
        {daysInMonth.map((day) => (
          <CalendarDay
            editTask={editTask}
            deleteTask={deleteTask}
            editedTaskId={editedTaskId}
            key={day.day}
            day={day}
            setEditedTaskId={setEditedTaskId}
            tasks={preparedEventsForDay[day.day]}
            addNewTask={(description) => {
              if (description) {
                addNewTask({ description, date: day });
              }
              setChosenDay(null);
            }}
            isChosenDay={chosenDay?.day === day.day}
            handleFormClose={() => setChosenDay(null)}
            handleCurrentDayChange={() => setChosenDay(day)}
          />
        ))}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default Calendar;
