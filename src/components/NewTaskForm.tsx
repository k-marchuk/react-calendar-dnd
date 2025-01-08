import React, { useState } from 'react';

import styled from 'styled-components';

const TaskForm = styled.form`
  display: flex;
  gap: 2px;
  position: relative;
  top: 24px;
  transition: opacity 0.5s ease;
`;

const StyledInput = styled.input`
  width: 80%;
  font-family: inherit;
  font-size: 12px;
  font-weight: 400;
  border: 0 solid gray;
  background: rgba(2, 73, 143, 0.11);
  box-shadow: 0 2px 2px 0px rgba(184, 180, 184, 0.49);
  border-bottom: 1px solid green;
  outline: 0;
`;

type Props = {
  onSubmit: (taskDescription: string) => void;
  onReset: () => void;
};

const NewTaskForm: React.FC<Props> = ({ onSubmit, onReset }) => {
  const [taskDescription, setTaskDescription] = useState<string>('');

  return (
    <TaskForm
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(taskDescription);
      }}
    >
      <StyledInput
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Type your task..."
      />
      <button type="submit">✅</button>
      <div onClick={onReset}>❌</div>
    </TaskForm>
  );
};

export default NewTaskForm;
