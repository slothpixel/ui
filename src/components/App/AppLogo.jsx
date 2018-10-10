import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import constants from '../constants';

const StyledLink = styled(Link)`
  &:hover {
    color: ${constants.textColorPrimary};
    opacity: 0.6;
  }
  img {
    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
   }
`;

const AppLogo = ({ style, strings }) => (
  <StyledLink to="/" style={style}>
    <img
      src="/assets/logo_x16.png"
      style={style}
    />
  </StyledLink>
);

export default AppLogo;
