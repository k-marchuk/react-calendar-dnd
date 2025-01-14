import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { HolidayEvent, Task } from '../../types/Task';
import { StyledCard, StyledIcon, StyledText, CardActions } from './style';

type Props = {
  task: Task | HolidayEvent;
  isDragging?: boolean;
  onTaskEdit?: () => void;
  onTaskDelete?: () => void;
};

const TaskCard: React.FC<Props> = ({
  onTaskEdit,
  isDragging,
  task,
  onTaskDelete,
}) => {
  const { attributes, listeners, setNodeRef } = useSortable({
    id: task.id,
    data: {
      task,
    },
  });

  return (
    <StyledCard ref={setNodeRef} $isDragging={!!isDragging}>
      <StyledText {...listeners} {...attributes}>
        {task.description}
      </StyledText>
      <CardActions>
        <StyledIcon onClick={onTaskEdit} className="material-symbols-outlined">
          edit
        </StyledIcon>
        <StyledIcon
          className="material-symbols-outlined"
          onClick={onTaskDelete}
        >
          delete
        </StyledIcon>
      </CardActions>
    </StyledCard>
  );
};

export default TaskCard;
