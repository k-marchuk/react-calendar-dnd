import AddTaskButton from '@src/components/AddTaskButton';
import React from 'react';
import { ActiveDay, Day } from '@src/types/Date';
import CalendarDayCell from '@src/components/CalendarDayCell';
import { EventType, Task } from '@src/types/Task';
import { type HolidayEvent as Holiday } from '@src/types/Task';
import TaskCard from '@src/components/TaskCard';
import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import {
  CardsCount,
  DayBody,
  DayHeader,
  DayNumber,
  HolidayEvent,
  InnerDiv,
  StyledIcon,
  StyledText,
} from './style';
import TaskForm from '@src/components/TaskForm';

type Props = {
  day: Day;
  dragTaskId: UniqueIdentifier | null;
  isChosenDay: boolean;
  tasks?: Array<Task | Holiday>;
  activeDay: ActiveDay;
  updateTask: (description: string, id: UniqueIdentifier) => void;
  deleteTask: (id: UniqueIdentifier) => void;
  setActiveFormDay: (day: Day) => void;
  setActiveFormTaskId: (taskId: UniqueIdentifier) => void;
  resetActiveForm: () => void;
  handleNewTaskSubmit: (description: string) => void;
  handleFormClose: () => void;
};

const CalendarDay: React.FC<Props> = ({
  dragTaskId,
  day,
  isChosenDay,
  tasks,
  handleNewTaskSubmit,
  updateTask,
  deleteTask,
  activeDay,
  setActiveFormDay,
  setActiveFormTaskId,
  resetActiveForm,
  handleFormClose,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: day.day,
    data: {
      isDay: true,
    },
  });

  const customTasks = tasks?.filter((task) => task.type === EventType.Custom);
  const holidayEvents = tasks?.filter(
    (task) => task.type === EventType.Holiday
  );

  const getHolidaysEvents = () =>
    holidayEvents?.map(({ description, id }) => {
      return (
        <HolidayEvent key={id}>
          <StyledText>{description}</StyledText>
          <StyledIcon className="material-symbols-outlined">
            celebration
          </StyledIcon>
        </HolidayEvent>
      );
    });

  const getCustomTasks = () =>
    customTasks?.map((task) =>
      activeDay.taskId !== task.id ? (
        <TaskCard
          key={task.id}
          task={task}
          isDragging={task.id === dragTaskId}
          onTaskDelete={() => deleteTask(task.id)}
          onTaskEdit={() => {
            setActiveFormTaskId(task.id);
          }}
        />
      ) : (
        <TaskForm
          key={task.id}
          defaultValue={task.description}
          onReset={resetActiveForm}
          onSubmit={(newDescription) => {
            updateTask(newDescription, task.id);
            resetActiveForm();
          }}
        />
      )
    );

  return (
    <CalendarDayCell>
      <DayHeader>
        <DayNumber>{day.day}</DayNumber>
        {!!customTasks?.length && (
          <CardsCount>
            {customTasks?.length === 1 ? '1 card' : `${tasks?.length} cards`}
          </CardsCount>
        )}
        {!isChosenDay && (
          <AddTaskButton
            onClick={() => {
              setActiveFormDay(day);
            }}
          />
        )}
      </DayHeader>
      <DayBody ref={setNodeRef} $isOver={isOver}>
        <InnerDiv>
          {getHolidaysEvents()}
          {getCustomTasks()}
          {isChosenDay && !activeDay.taskId && (
            <TaskForm
              onSubmit={handleNewTaskSubmit}
              onReset={handleFormClose}
            />
          )}
        </InnerDiv>
      </DayBody>
    </CalendarDayCell>
  );
};

export default CalendarDay;
