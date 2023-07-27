import { useState } from 'react';

type UseCounterHook = (
  value: number | { initial: number; min: number; max: number }
) => {
  value: number;
  increase: () => void;
  decrease: () => void;
};

export const useCounter: UseCounterHook = (option) => {
  const initialValue = typeof option === 'number' ? option : option.initial;
  const [value, setValue] = useState(initialValue);

  const increase = () => {
    if (typeof option === 'object' && value === option.max) return;
    setValue((count) => count + 1);
  };
  const decrease = () => {
    if (typeof option === 'object' && value === option.min) return;
    setValue((count) => count - 1);
  };

  return { value: value, increase, decrease };
};
