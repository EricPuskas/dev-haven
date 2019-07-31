import { useState } from "react";

function useToggleState(initVal = false) {
  // call useState, "reserve the piece of state"
  const [state, setState] = useState(initVal);
  const toggle = () => {
    setState(!state);
  };
  // return piece of state and a function to toggle it
  return [state, toggle];
}

export default useToggleState;
