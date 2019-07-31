import React from "react";
import uuid from "uuid";

const filterOptions = (opt, defaultValue) => {
  let results = [];
  let filter = [];
  filter = opt.filter(option => option !== defaultValue);
  filter.forEach(option =>
    results.push({
      id: uuid(),
      value: option
    })
  );
  results = results.map(option => (
    <option key={option.id} value={option.value}>
      {option.value}
    </option>
  ));
  return results;
};

export default filterOptions;
