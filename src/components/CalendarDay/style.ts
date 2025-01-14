import styled from 'styled-components';

export const DayHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const DayBody = styled.div<{ $isOver: boolean }>`
  overflow: hidden;
  min-height: 100px;
  border: 1px dashed;
  border-color: ${(props) => (props.$isOver ? 'black' : 'transparent')};
`;

export const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  height: 100%;
  gap: 4px;
  padding-right: 15px;
`;

export const DayNumber = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #5f6061;
`;

export const CardsCount = styled.span`
  font-size: 12px;
  color: #5f6061;
  margin-left: 5px;
`;

export const HolidayEvent = styled.div`
  font-size: 12px;
  color: red;
  font-style: italic;
  display: flex;
  justify-content: space-between;
  padding: 4px;
  border-radius: 4px;
  background-color: #fff;
  font-size: 12px;
`;

export const StyledText = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
`;

export const StyledIcon = styled.span`
  display: flex;
  font-size: 16px;
`;
