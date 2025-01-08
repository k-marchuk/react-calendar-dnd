import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import CalendarDay from './CalendarDay';
import ToggleUpButton from './ToggleUpButton';
import ToggleDownButton from './ToggleDownButton';
import { generateCalendar } from '../helpers/generateCalendar';
import { Day } from '../types/Date';
import CalendarEmptyDay from './CalendarEmptyDay';
import { Task } from '../types/Task';

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
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [chosenDay, setChosenDay] = useState<Day | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startingDayIndex = firstDayOfMonth.getDay();

  const daysInMonth = generateCalendar(currentMonth);

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + increment);
    setCurrentMonth(newDate);
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  useEffect(() => {
    if (tasks.length) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addNewTask = (task: Omit<Task, 'id'>) => {
    setTasks((currentTasks) => [...currentTasks, { ...task, id: uuidv4() }]);
  };

  const preparedEventsForDay = useMemo(() => {
    return tasks
      .filter(({ date }) => date.month === month) //TODO filter by query here
      .reduce((acc, task) => {
        if (acc[task.date.day]) {
          acc[task.date.day].push(task);
        } else {
          acc[task.date.day] = [task];
        }

        return acc;
      }, {} as { [key: number]: Task[] });
  }, [month, tasks]);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <TodayButton onClick={() => setCurrentMonth(new Date())}>
          Today
        </TodayButton>
        <MonthsToggle>
          <ToggleUpButton onMonthChange={changeMonth}></ToggleUpButton>
          <ToggleDownButton onMonthChange={changeMonth}></ToggleDownButton>
        </MonthsToggle>

        <CurrentMonth>
          {currentMonth.toLocaleDateString('en-GB', {
            month: 'long',
            year: 'numeric',
          })}
        </CurrentMonth>
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
            key={day.day}
            day={day}
            tasks={preparedEventsForDay[day.day]}
            addNewTask={(description) => {
              addNewTask({ description, date: day });
              setChosenDay(null);
            }}
            isChosenDay={!!chosenDay && chosenDay.day === day.day}
            handleFormClose={() => setChosenDay(null)}
            handleCurrentDayChange={() => setChosenDay(day)}
          />
        ))}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default Calendar;
