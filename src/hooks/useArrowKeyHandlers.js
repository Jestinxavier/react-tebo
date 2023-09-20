import { useEffect } from 'react';

const useArrowKeyHandlers = (handlers) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const keyHandlers = {
        ArrowUp: handlers.up,
        ArrowDown: handlers.down,
        ArrowRight: handlers.right,
        ArrowLeft: handlers.left,
      };

      if (keyHandlers[event.key]) {
        keyHandlers[event.key](true); // true indicates key press
      }
    };

    const handleKeyUp = (event) => {
      const keyHandlers = {
        ArrowUp: handlers.up,
        ArrowDown: handlers.down,
        ArrowRight: handlers.right,
        ArrowLeft: handlers.left,
      };

      if (keyHandlers[event.key]) {
        keyHandlers[event.key](false); // false indicates key release
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handlers]);
};

export default useArrowKeyHandlers;
