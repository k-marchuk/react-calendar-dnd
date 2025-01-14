import React from 'react';
import { AddCircleIcon } from './style';

type Props = {
  onClick: () => void;
};

const AddTaskButton: React.FC<Props> = ({ onClick }) => {
  return (
    <AddCircleIcon
      onClick={onClick}
      className="add-button material-symbols-outlined"
    >
      add_circle
    </AddCircleIcon>
  );
};

export default AddTaskButton;
