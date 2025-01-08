import ArrowUpIcon from './../assets/arrow_up.svg';
import React from 'react';
import ToggleButton from './ToggleButton';

type Props = {
  onMonthChange: (num: number) => void;
};

const ToggleUpButton: React.FC<Props> = ({ onMonthChange }) => {
  return (
    <ToggleButton onClick={() => onMonthChange(-1)}>
      <img src={ArrowUpIcon} />
    </ToggleButton>
  );
};

export default ToggleUpButton;
