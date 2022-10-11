import { useState } from 'react';

interface UseStepperProps {
  genericProp: number;
}

export function useStepper({ genericProp }: UseStepperProps) {
  const [state, setState] = useState(genericProp);

  function stateIncrementer() {
    setState((prev) => prev + 1);
  }

  return { state, setState, stateIncrementer };
}
