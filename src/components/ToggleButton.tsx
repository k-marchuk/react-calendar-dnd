import styled from 'styled-components';

const MonthToggleButton = styled.button`
  background-color: #e2e4e6;
  border-radius: 4px;
  border: 0 solid gray;
  cursor: pointer;
  box-shadow: 0 2px 2px 0px rgba(184, 180, 184, 1);

  transition: background-color 0.3s ease, box-shadow 0.2s ease,
    transform 0.1s ease;

  &:hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }

  &:active {
    background-color: rgba(2, 73, 143, 0.11);
    transform: scale(0.95);
  }

  &:focus {
    outline: 1px solid rgba(108, 124, 127, 0.64);
  }
`;
type Props = {
  onClick: () => void;
  children?: React.ReactNode;
};

const ToggleButton: React.FC<Props> = ({ onClick, children }) => {
  return <MonthToggleButton onClick={onClick}>{children}</MonthToggleButton>;
};

export default ToggleButton;
