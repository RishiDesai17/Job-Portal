import { useRef } from 'react';

const useWillMount = (fn, loggedIn) => {
    const currentState = useRef(false);
    if (currentState.current !== loggedIn) {
      currentState.current = loggedIn;
      fn();
    }
}

export default useWillMount;
