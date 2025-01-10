import React, { useState } from 'react';

import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  gap: 2px;
  position: relative;
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

const StyledButton = styled.button`
  display: flex;
  background-color: transparent;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 2px;

  & span {
    font-size: 16px;
  }
`;

type Props = {
  onSubmit: (taskDescription: string) => void;
  onReset: () => void;
  defaultValue?: string;
};

const TaskForm: React.FC<Props> = ({
  onSubmit,
  onReset,
  defaultValue = '',
}) => {
  const [taskDescription, setTaskDescription] = useState<string>(defaultValue);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(taskDescription);
      }}
    >
      <StyledInput
        autoFocus
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Type your task..."
        required
      />
      <StyledButton type="submit">
        <span className="material-symbols-outlined">check</span>
      </StyledButton>
      <StyledButton onClick={onReset}>
        <span className="material-symbols-outlined">close</span>
      </StyledButton>
    </Form>
  );
};

export default TaskForm;
