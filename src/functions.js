/************/
/* DEBOUNCE */
/************/
export function debounce(func, wait, immediate = false) {
  // Debounce function from https://davidwalsh.name/javascript-debounce-function
  let timeout
  // eslint-disable-next-line
  return function(...args) {
    const context = this
    const later = () => {
      timeout = undefined
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}