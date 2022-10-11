/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createStitches } from '@stitches/react';

export const { styled, getCssText, createTheme, globalCss } = createStitches({
  theme: {
    colors: {
      gray400: 'gainsboro',
      gray500: 'lightgray',
      purple400: 'blueviolet',
      purple500: 'darkviolet',
      red400: 'tomato',
      red500: '#cc0000',

      //Semantic Tokens
      primary: '$purple400',
      primaryDark: '$purple500'
    },
    space: {
      1: '10px',
      2: '20px'
    },
    fontSizes: {}
  },
  utils: {
    px: (config: any) => (value: any) => ({
      paddingLeft: value,
      paddingRight: value
    })
  },
  media: {
    bp1: '@media (min-width: 400px)'
  }
});
