import { ChangeEventHandler, useState } from 'react';

export const useForm = <T>(initial: T) => {
  const [value, setValue] = useState(initial);

  const registerOnChange: (name: keyof T) => ChangeEventHandler =
    (name) => (event) => {
      if (!('value' in event.target)) return;

      setValue((value) => ({
        ...value,
        [name]: (<HTMLInputElement>event.target).value,
      }));
    };

  return { registerOnChange, value };
};
