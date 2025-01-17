import { observer, useLocalObservable } from 'mobx-react-lite';
import React from 'react';
export default observer(() => {
  const state = useLocalObservable(() => ({
    count: 0,
    setCount() {
      this.count++;
    },
    get double() {
      return this.count * 2;
    },
  }));
  return (
    <div>
      {' '}
      App
      <div>
        {state.count}
        <br />
        {state.double}
      </div>
      <div>
        <button onClick={() => state.setCount()}>+</button>
      </div>
    </div>
  );
});
