export const changeFocusTo = (event: any, ref: any, shift = false) => {
  if (event.key === 'Tab' && (shift ? event.shiftKey : !event.shiftKey)) {
    event.preventDefault();
    ref.current?.focus();
  }
};
