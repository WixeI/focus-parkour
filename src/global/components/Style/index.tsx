import React from 'react';
import { styled } from '../../../configs/stitches/stitches.config';

interface PasserProps {
  children: JSX.Element;
}

const Passer = ({ children, ...rest }: PasserProps) => {
  return React.cloneElement(children, { ...rest });
};

const Style = styled(Passer, {});

export default Style;
