import { atom, useRecoilState } from "recoil";

const counterStateAtom = atom({
  key: "counter-state",
  default: 0,
});

function useCounter() {
  const [counterState, setCounterState] = useRecoilState(counterStateAtom);

  function increase() {
    setCounterState((currentState) => currentState + 1);
  }

  function decrease() {
    setCounterState((currentState) => currentState - 1);
  }

  function reset() {
    setCounterState(() => 0);
  }

  return [counterState, { increase, decrease, reset }];
}

export default useCounter;
