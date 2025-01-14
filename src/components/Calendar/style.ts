import styled from 'styled-components';

export const CalendarContainer = styled.div`
  background-color: #edeff1;
  border-radius: 8px;
  overflow: hidden;
`;

export const CalendarHeader = styled.div`
  display: flex;
  padding: 20px;
  background-color: #edeff1;
  color: #343435;
  font-weight: bold;
  font-size: 18px;
`;

export const MonthsToggle = styled.div`
  display: flex;
  gap: 6px;
  width: max-content;
`;

export const StyledInputSearch = styled.input`
  border: 1px solid gray;
  border-radius: 4px;
  padding-inline: 4px;
  min-width: 200px;
`;

export const StyledFilterIcon = styled.span`
  display: flex;
  padding: 6px;
`;

export const CurrentMonth = styled.span`
  margin: auto;
`;

export const Weekday = styled.div`
  text-align: center;

  color: #5f6061;
  font-weight: bold;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-gap: 6px;
  padding: 10px;
`;

export const TodayButton = styled.div`
  background-color: #e2e4e6;
  line-height: 28px;
  padding: 4px 18px;
  margin-right: 20px;
  border-radius: 4px;
  border: 0 solid gray;
  cursor: pointer;
  box-shadow: 0 2px 2px 0px rgba(184, 180, 184, 1);
  transition: background-color 0.3s ease, transform 0.1s ease;

  &:hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }

  &:active {
    background-color: rgba(2, 73, 143, 0.11);
    transform: scale(0.95);
  }

  &:focus {
    outline: 2px solid #6c7c7f;
  }
`;
