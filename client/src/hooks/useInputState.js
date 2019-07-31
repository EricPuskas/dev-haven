import { useState } from "react";
export default initVal => {
  const [value, setValue] = useState(initVal);

  const handleChange = e => {
    typeof value === "boolean" ? setValue(!value) : setValue(e.target.value);
  };

  const handleUpdate = value => {
    setValue(value);
  };

  const reset = () => {
    typeof value === "boolean" ? setValue(false) : setValue("");
  };
  return [value, handleChange, reset, handleUpdate];
};
