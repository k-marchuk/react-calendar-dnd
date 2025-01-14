import styled from 'styled-components';

export const StyledCalendarDayCell = styled.div`
  height: 120px;
  background-color: #e2e4e6;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 4px;

  &:hover .add-button {
    display: block;
    cursor: pointer;
  }
`;
