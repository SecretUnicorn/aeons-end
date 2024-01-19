/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash";
import { useCallback, useEffect, useRef } from "react";

export function useDebounce(cb, delay) {
  const inputsRef = useRef({ cb, delay });
  useEffect(() => {
    inputsRef.current = { cb, delay };
  });
  return useCallback(
    _.debounce((...args) => {
      if (inputsRef.current.delay === delay) inputsRef.current.cb(...args);
    }, delay),
    [delay, _.debounce]
  );
}

export function useThrottle(cb, delay) {
  const inputsRef = useRef({ cb, delay });
  useEffect(() => {
    inputsRef.current = { cb, delay };
  });
  return useCallback(
    _.throttle(
      (...args) => {
        inputsRef.current.cb(...args);
      },
      delay,
      { trailing: true, leading: false }
    ),
    [delay, _.throttle]
  );
}
