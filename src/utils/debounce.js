export default function debounce(func, delay) {
  let timer,
    context = this;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
