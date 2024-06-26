export function createHooks(callback) {
  const stateContext = {
    current: 0,
    states: [],
  };

  const memoContext = {
    current: 0,
    memos: [],
  };

  function resetContext() {
    stateContext.current = 0;
    memoContext.current = 0;
  }

  const useState = (initState) => {
    const { current, states } = stateContext;
    let rafId;
    stateContext.current += 1;

    states[current] = states[current] ?? initState;

    const setState = (newState) => {
      // TODO: 여기가 변경점인듯...
      if (newState === states[current]) return;

      states[current] = newState;
      const _render = () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          return;
        }
        callback();
        rafId = requestAnimationFrame(_render);
      };
      requestAnimationFrame(_render);
    };

    return [states[current], setState];
  };

  const useMemo = (fn, refs) => {
    const { current, memos } = memoContext;
    memoContext.current += 1;

    const memo = memos[current];

    const resetAndReturn = () => {
      const value = fn();
      memos[current] = {
        value,
        refs,
      };
      return value;
    };

    if (!memo) {
      return resetAndReturn();
    }

    if (refs.length > 0 && memo.refs.find((v, k) => v !== refs[k])) {
      return resetAndReturn();
    }
    return memo.value;
  };

  return { useState, useMemo, resetContext };
}
