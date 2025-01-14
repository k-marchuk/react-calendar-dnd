import ArrowUpIcon from '../../assets/arrow_up.svg';
import ArrowDownIcon from '../../assets/arrow_down.svg';

import React from 'react';
import { Direction } from '../../types/Direction';
import { Button } from './style';

type Props = {
  onMonthChange: (num: number) => void;
  direction: string;
};

const MonthNavigationButton: React.FC<Props> = ({
  onMonthChange,
  direction,
}) => {
  return (
    <Button
      onClick={() => {
        if (direction === Direction.Up) {
          onMonthChange(-1);
        } else {
          onMonthChange(1);
        }
      }}
    >
      {direction === Direction.Up ? (
        <img src={ArrowUpIcon} />
      ) : (
        <img src={ArrowDownIcon} />
      )}
    </Button>
  );
};

export default MonthNavigationButton;
