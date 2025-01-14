import React, { useState } from 'react';
import { Form, StyledButton, StyledInput } from './style';

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
