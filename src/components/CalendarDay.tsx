import styled from 'styled-components';
import AddTaskButton from './AddTaskButton';
import React from 'react';
import TaskForm from './TaskForm';
import { Day } from '../types/Date';
import CalendarDayCell from './CalendarDayCell';
import { EventType, Task } from '../types/Task';
import TaskCard from './TaskCard';

const DayHeader = styled.div`
  display: flex;
  align-items: center;
`;

const DayNumber = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #5f6061;
`;

const CardsCount = styled.span`
  font-size: 12px;
  color: #5f6061;
  margin-left: 5px;
`;

const HolidayEvent = styled.div`
  font-size: 12px;
  color: red;
  font-style: italic;
  display: flex;
  justify-content: space-between;
  padding: 4px;
  border-radius: 4px;
  background-color: #fff;
  font-size: 12px;
`;

const StyledText = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
`;

const StyledIcon = styled.span`
  display: flex;
  font-size: 16px;
`;

type Props = {
  day: Day;
  isChosenDay: boolean;
  tasks?: Task[];
  editedTaskId: string | null;
  editTask: (description: string, id: string) => void;
  deleteTask: (id: string) => void;
  setEditedTaskId: (id: string | null) => void;
  addNewTask: (description: string) => void;
  handleFormClose: () => void;
  handleCurrentDayChange: () => void;
};

const CalendarDay: React.FC<Props> = ({
  day,
  isChosenDay,
  tasks,
  addNewTask,
  editTask,
  deleteTask,
  editedTaskId,
  setEditedTaskId,
  handleFormClose,
  handleCurrentDayChange,
}) => {
  return (
    <CalendarDayCell>
      <DayHeader>
        <DayNumber>{day.day}</DayNumber>
        {tasks?.length && (
          <CardsCount>
            {tasks?.length === 1 ? '1 card' : `${tasks?.length} cards`}
          </CardsCount>
        )}
        {!isChosenDay && (
          <AddTaskButton
            onClick={() => {
              handleCurrentDayChange();
              setEditedTaskId(null);
            }}
          />
        )}
      </DayHeader>
      {tasks?.length &&
        tasks?.map(({ description, id, type }) => {
          if (type === EventType.Holiday) {
            return (
              <HolidayEvent key={id}>
                <StyledText>{description}</StyledText>
                <StyledIcon className="material-symbols-outlined">
                  celebration
                </StyledIcon>
              </HolidayEvent>
            );
          }
          return false;
        })}
      {tasks
        ?.filter((task) => task.type === EventType.Custom)
        .map((task) =>
          editedTaskId !== task.id ? (
            <TaskCard
              key={task.id}
              onDelete={() => deleteTask(task.id)}
              onEdit={() => {
                setEditedTaskId(task.id);
              }}
              description={task.description}
            />
          ) : (
            <TaskForm
              key={task.id}
              defaultValue={task.description}
              onReset={() => setEditedTaskId(null)}
              onSubmit={(newDescription) => {
                editTask(newDescription, task.id);
                setEditedTaskId(null);
              }}
            />
          )
        )}

      {isChosenDay && (
        <TaskForm onSubmit={addNewTask} onReset={handleFormClose} />
      )}
    </CalendarDayCell>
  );
};

export default CalendarDay;
