/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createStitches } from '@stitches/react';

export const { styled, getCssText, createTheme, globalCss } = createStitches({
  theme: {
    colors: {
      gray50: '#f1f7ff',
      gray100: '#e8eefd',
      gray200: '#dce3f1',
      gray300: '#cad0df',
      gray400: '#a6acba',
      gray500: '#858b98',
      gray600: '#5e6370',
      gray700: '#4b505d',
      gray800: '#2d323e',
      gray900: '#0d131d',

      gray900A60: '#0d131d99',
      gray900A90: '#0d131dE6',

      //Semantic Tokens
      primary50: '#e5f3eb',
      primary100: '#c1e1cd',
      primary200: '#9acead',
      primary300: '#72bc8e',
      primary400: '#54ae77',
      primary500: '#34a061',
      primary600: '#2e9257',
      primary700: '#26804b',
      primary800: '#206f41',
      primary900: '#17502e',

      primary: '$primary500',

      fontOnLight: '$gray900',
      fontOnDark: '$gray50',

      backgroundDark: '$gray900A90'
    },
    shadows: {
      xs: '',
      md: '0px 0px 8px 4px $colors$gray900A60',
      lg: ''
    },
    space: {
      1: '10px',
      2: '20px'
    },
    fontSizes: {
      t3: '12px',
      t2: '16px',
      t1: '20px',
      h3: '30px',
      h2: '36px',
      h1: '42px',
      d3: '48px',
      d2: '60px',
      d1: '72px'
    }
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

/*
  Alpha Guides:
  100% — FF
  90% — E6
  80% — CC
  70% — B3
  60% — 99
  50% — 80
  40% — 66
  30% — 4D
  20% — 33
  10% — 1A
  0% — 00
*/
