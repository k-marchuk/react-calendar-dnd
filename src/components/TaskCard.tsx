import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  padding: 4px;
  border-radius: 4px;
  background-color: #fff;
  position: relative;
  top: 22px;
  text-align: left;
  font-size: 12px;
`;

type Props = {
  children: ReactNode;
};

const TaskCard: React.FC<Props> = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

export default TaskCard;
