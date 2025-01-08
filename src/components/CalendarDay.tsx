import styled from 'styled-components';
import AddTaskButton from './AddTaskButton';
import React from 'react';
import NewTaskForm from './NewTaskForm';
import { Day } from '../types/Date';
import CalendarDayCell from './CalendarDayCell';
import { Task } from '../types/Task';
import TaskCard from './TaskCard';

// const bu = [
//   {
//     id: 1,
//     date: {
//       day: 11,
//       month: 1,
//       year: 2025,
//     },
//     description: 'da',
//   },
// ];

const DayNumber = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  color: #5f6061;
  position: absolute;
`;

const CardsCount = styled.span`
  font-size: 12px;
  text-align: left;
  color: #5f6061;
  position: absolute;
  left: 24px;
  padding-top: 4px;
`;

type Props = {
  day: Day;
  isChosenDay: boolean;
  tasks?: Task[];
  addNewTask: (description: string) => void;
  handleFormClose: () => void;
  handleCurrentDayChange: () => void;
};

const CalendarDay: React.FC<Props> = ({
  day,
  isChosenDay,
  tasks,
  addNewTask,
  handleFormClose,
  handleCurrentDayChange,
}) => {
  return (
    <CalendarDayCell>
      <DayNumber>{day.day}</DayNumber>
      {tasks?.length && (
        <CardsCount>
          {tasks?.length === 1 ? '1 card' : `${tasks?.length} cards`}
        </CardsCount>
      )}
      {tasks?.map((task) => (
        <TaskCard key={task.id}>{task.description}</TaskCard>
      ))}
      {isChosenDay ? (
        <NewTaskForm onSubmit={addNewTask} onReset={handleFormClose} />
      ) : (
        <AddTaskButton onClick={handleCurrentDayChange} />
      )}
    </CalendarDayCell>
  );
};

export default CalendarDay;
