import React from 'react';

import CalendarDay from '../CalendarDay';
import CalendarEmptyDay from '../CalendarEmptyDay';
import MonthNavigationButton from '../MonthNavigationButton';
import {
  defaultDropAnimation,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
} from '@dnd-kit/core';
import TaskCard from '../TaskCard';
import {
  CalendarContainer,
  CalendarGrid,
  CalendarHeader,
  CurrentMonth,
  MonthsToggle,
  StyledCloseButton,
  StyledFilterIcon,
  StyledInputSearch,
  TodayButton,
  Weekday,
} from './style';
import { WEEKDAYS } from '../../helpers/weekdays';
import useCalendarController from '../../hooks/useCalendarController';
import useActiveForm from '../../hooks/useActiveForm';
import useDragEventHandlers from '../../hooks/useDragEventHandlers';

const Calendar: React.FC = () => {
  const { activeForm, setActiveFormDay, setActiveFormTaskId, resetActiveForm } =
    useActiveForm();

  const {
    changeMonth,
    daysInMonth,
    startingDayIndex,
    setToday,
    calendarMonthTitle,
    preparedEventsForDay,
    query,
    setQuery,
    handleNewTaskSubmit,
    updateTask,
    deleteTask,
    setTasks,
    sourceTasks,
    setTempTasks,
  } = useCalendarController(resetActiveForm);

  const { activeId, dragTask, handleDragStart, handleDragOver, handleDragEnd } =
    useDragEventHandlers(
      sourceTasks,
      preparedEventsForDay,
      setTasks,
      setTempTasks
    );

  return (
    <CalendarContainer>
      <CalendarHeader>
        <TodayButton onClick={setToday}>Today</TodayButton>
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

        <CurrentMonth>{calendarMonthTitle}</CurrentMonth>
        <StyledFilterIcon className="material-symbols-outlined">
          search
        </StyledFilterIcon>
        <StyledInputSearch
          placeholder="Search by task description..."
          onChange={(event) => {
            setQuery(event.target.value);
            resetActiveForm();
          }}
        />
        {query && (
          <StyledCloseButton onClick={() => setQuery('')}>
            {' '}
            <span className="material-symbols-outlined">close</span>
          </StyledCloseButton>
        )}
      </CalendarHeader>

      <CalendarGrid>
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          {WEEKDAYS.map((weekday) => {
            return <Weekday key={weekday}>{weekday}</Weekday>;
          })}
          {Array.from({ length: startingDayIndex }).map((_, index: number) => {
            return <CalendarEmptyDay key={`empty-${index}`} />;
          })}
          {daysInMonth.map((day) => (
            <CalendarDay
              dragTaskId={activeId}
              updateTask={updateTask}
              deleteTask={deleteTask}
              activeDay={activeForm}
              key={day.day}
              day={day}
              setActiveFormTaskId={setActiveFormTaskId}
              setActiveFormDay={setActiveFormDay}
              resetActiveForm={resetActiveForm}
              tasks={preparedEventsForDay[day.day]}
              handleNewTaskSubmit={handleNewTaskSubmit(day)}
              isChosenDay={activeForm.day?.day === day.day}
              handleFormClose={resetActiveForm}
            />
          ))}
          <DragOverlay
            style={{
              cursor: 'grabbing',
            }}
            dropAnimation={{
              ...defaultDropAnimation,
              sideEffects: defaultDropAnimationSideEffects({
                styles: {
                  active: {
                    opacity: '1',
                  },
                },
              }),
            }}
          >
            {dragTask && <TaskCard task={dragTask} />}
          </DragOverlay>
        </DndContext>
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default Calendar;
