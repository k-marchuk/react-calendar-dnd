import React from 'react';
import { StyledCalendarDayCell } from './style';

type Props = {
  children?: React.ReactNode;
};
const CalendarDayCell: React.FC<Props> = ({ children }) => {
  return <StyledCalendarDayCell>{children}</StyledCalendarDayCell>;
};

export default CalendarDayCell;
