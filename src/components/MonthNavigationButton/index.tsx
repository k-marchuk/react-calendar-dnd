import React from 'react';
import { Button } from './style';
import { Direction } from '@src/types/Direction';
import ArrowUpIcon from '@src/assets/arrow_up.svg';
import ArrowDownIcon from '@src/assets/arrow_down.svg';

type Props = {
  onMonthChange: (num: number) => void;
  direction: Direction;
};

const MonthNavigationButton: React.FC<Props> = ({
  onMonthChange,
  direction,
}) => {
  const handleClick = () => {
    onMonthChange(direction === Direction.Up ? -1 : 1);
  };

  return (
    <Button onClick={handleClick}>
      <img src={direction === Direction.Up ? ArrowUpIcon : ArrowDownIcon} />
    </Button>
  );
};

export default MonthNavigationButton;
