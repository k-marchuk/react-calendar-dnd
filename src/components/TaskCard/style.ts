import styled from 'styled-components';

export const StyledCard = styled.div<{ $isDragging: boolean }>`
  display: flex;
  padding: 4px;
  border-radius: 4px;
  background-color: #fff;
  font-size: 12px;
  opacity: ${(props) => (props.$isDragging ? '0.5' : '1')} !important;

  &:hover div {
    display: flex;
  }
`;

export const StyledIcon = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

export const StyledText = styled.p`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  cursor: grab;
`;

export const CardActions = styled.div`
  display: none;
  gap: 2px;
`;
