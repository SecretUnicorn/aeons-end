import { atom, useRecoilState } from 'recoil';

import { Actions } from './types';

const counterStateAtom = atom<number>({
  key: 'counter-state',
  default: 0,
});

function useCounter(): [number, Actions] {
  const [counterState, setCounterState] = useRecoilState(counterStateAtom);

  function increase() {
    setCounterState((currentState: number) => currentState + 1);
  }

  function decrease() {
    setCounterState((currentState: number) => currentState - 1);
  }

  function reset() {
    setCounterState(() => 0);
  }

  return [counterState, { increase, decrease, reset }];
}

export default useCounter;
