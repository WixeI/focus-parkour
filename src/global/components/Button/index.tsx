import { styled } from '../../../configs/stitches/stitches.config';
import { summerTheme } from '../../styles/themes/summer';
import { Box } from '../Box';

export const Button = styled('button', {
  // mini reset
  appearance: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  lineHeight: 1,
  borderRadius: '99999px',
  px: '$1',

  variants: {
    size: {
      1: {
        fontSize: '13px',
        height: '25px'
      },
      2: {
        fontSize: '15px',
        height: '35px'
      }
    },
    variant: {
      gray: {
        backgroundColor: '$gray400',
        '&:hover': {
          backgroundColor: '$gray500'
        }
      },
      primary: {
        backgroundColor: '$primary',
        color: 'white',
        '&:hover': {
          backgroundColor: '$primaryDark'
        }
      }
    },
    outlined: {
      true: {
        $$shadowColor: 'transparent',
        backgroundColor: 'transparent',
        boxShadow: '0 0 0 1px $$shadowColor'
      }
    }
  },

  defaultVariants: {
    variant: 'gray',
    size: 1
  },

  compoundVariants: [
    {
      variant: 'gray',
      outlined: true,
      css: {
        $$shadowColor: '$colors$gray400'
      }
    },
    {
      variant: 'primary',
      outlined: true,
      css: {
        $$shadowColor: '$colors$primary',
        color: '$primary',
        '&:hover': {
          color: 'white'
        }
      }
    }
  ]
});
