import { useState, useEffect, useCallback } from 'react';

const useInput = (initValue = '', rule: (v: string) => string) => {
  const [value, setValue] = useState(initValue);
  const [valid, setValid] = useState('');
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(() => e.target.value);
  }, []);

  useEffect(() => {
    if (rule) setValid(() => rule(value));
  }, [value]);
  return {
    value,
    setValue,
    onChange,
    valid,
  };
};

export default useInput;
