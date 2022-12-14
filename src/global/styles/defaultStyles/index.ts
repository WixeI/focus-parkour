import { globalCss } from '../../../configs/stitches/stitches.config';

//we can call the color token values with the
//$ prefix in a string
export const defaultStyles = globalCss({
  body: {
    fontFamily: 'Oxygen, sans-seriff',
    boxSizing: 'border-box'
  },
  '*': {
    fontFamily: 'Oxygen, sans-seriff',
    boxSizing: 'border-box'
  }
});
