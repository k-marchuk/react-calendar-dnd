import React from 'react';
import styled from 'styled-components';

import AddButton from './../assets/add_circle.svg';

const AddCircleIcon = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 85%;
  top: 7px;
  opacity: 0;
  transition: opacity 0.5s ease;
`;

type Props = {
  onClick: () => void;
};

const AddTaskButton: React.FC<Props> = ({ onClick }) => {
  return <AddCircleIcon src={AddButton} onClick={onClick} alt="add-button" />;
};

export default AddTaskButton;
