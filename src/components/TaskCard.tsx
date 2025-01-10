import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  border-radius: 4px;
  background-color: #fff;
  font-size: 12px;

  &:hover div {
    display: flex;
  }
`;

const StyledIcon = styled.span`
  font-size: 14px;
`;

const StyledText = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
`;

const CardActions = styled.div`
  display: none;
  gap: 2px;
`;

type Props = {
  onEdit: () => void;
  onDelete: () => void;
  description: string;
};

const TaskCard: React.FC<Props> = ({ onEdit, description, onDelete }) => {
  return (
    <StyledCard>
      <StyledText> {description}</StyledText>
      <CardActions>
        <StyledIcon onClick={onEdit} className="material-symbols-outlined">
          edit
        </StyledIcon>
        <StyledIcon className="material-symbols-outlined" onClick={onDelete}>
          delete
        </StyledIcon>
      </CardActions>
    </StyledCard>
  );
};

export default TaskCard;
