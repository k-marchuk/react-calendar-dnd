import styled from 'styled-components';
import React from 'react';

const StyledCalendarDayCell = styled.div`
  height: 120px;
  background-color: #e2e4e6;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover img {
    opacity: 1;
  }
`;

type Props = {
  children?: React.ReactNode;
};
const CalendarDayCell: React.FC<Props> = ({ children }) => {
  return <StyledCalendarDayCell>{children}</StyledCalendarDayCell>;
};

export default CalendarDayCell;
