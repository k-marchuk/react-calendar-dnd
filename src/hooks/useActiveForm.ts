import { useState } from 'react';
import { ActiveDay, Day } from '../types/Date';
import { UniqueIdentifier } from '@dnd-kit/core';

const activeFormDefaultValue = { day: null, taskId: null };

const useActiveForm = () => {
  const [activeForm, setActiveForm] = useState<ActiveDay>(
    activeFormDefaultValue
  );
  const resetActiveForm = () => {
    setActiveForm(activeFormDefaultValue);
  };

  const setActiveFormDay = (day: Day) => {
    setActiveForm({ ...activeFormDefaultValue, day });
  };

  const setActiveFormTaskId = (taskId: UniqueIdentifier) => {
    setActiveForm({ ...activeFormDefaultValue, taskId });
  };

  return {
    resetActiveForm,
    setActiveFormDay,
    setActiveFormTaskId,
    activeForm,
    setActiveForm,
  } as const;
};

export default useActiveForm;
