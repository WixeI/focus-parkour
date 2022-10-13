import { styled } from '@stitches/react';
import Style from '../../global/components/Style';

export const S = {
  DivWrapper: styled('div', {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    color: '$fontOnDark',
    fill: '$fontOnDark',
    fontFamily: 'Oxygen, sans-seriff'
  }),

  MainContent: styled('main', {
    width: '100%',
    height: '100%',
    overflowY: 'clip'
  }),

  StyleReactPlayer: styled(Style, {
    position: 'absolute',
    left: '0',
    top: '0',

    zIndex: '-1'
  }),

  AsideMenu: styled('aside', {
    width: '400px',
    height: '100%',
    background: '$backgroundDark',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    boxShadow: '$md'
  }),

  DivTitle: styled('div', {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',

    padding: '8px'
  }),

  HeadingTitle: styled('h2', {
    fontSize: '$h3'
  }),

  Form: styled('form', {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '24px',
    alignItems: 'start'
  }),

  SectionForm: styled('section', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
    gap: '16px',

    width: '100%',
    paddingBottom: '16px'
  }),

  Label: styled('label', {}),

  Textarea: styled('textarea', {
    resize: 'none',
    height: '8ch'
  }),

  Select: styled('input', {}),

  Button: styled('button', {
    marginTop: '8px',
    width: '50%'
  })
};
