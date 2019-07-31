import { useState } from "react";
export default initVal => {
  const [value, setValue] = useState(initVal);
  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleUpdate = value => {
    setValue(value);
  };
  return [value, handleChange, handleUpdate];
};
