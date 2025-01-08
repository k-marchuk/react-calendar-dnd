import ArrowDownIcon from './../assets/arrow_down.svg';
import React from 'react';
import ToggleButton from './ToggleButton';

type Props = {
  onMonthChange: (num: number) => void;
};

const ToggleDownButton: React.FC<Props> = ({ onMonthChange }) => {
  return (
    <ToggleButton onClick={() => onMonthChange(1)}>
      <img src={ArrowDownIcon} />
    </ToggleButton>
  );
};

export default ToggleDownButton;
