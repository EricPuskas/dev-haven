function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer); //Prevent the function set with the setTimeout() to execute
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export default debounce;
