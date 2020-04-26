import styled, { css } from 'styled-components';

import { Link as RouterLink } from 'react-router-dom';

interface ContainerProps {
  size?: 'small' | 'large';
}

interface LinkProps {
  active?: number;
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Link = styled(RouterLink)<LinkProps>`
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  transition: opacity 0.2s;
  position: relative;

  /* &::after {
    ${props =>
      props.active &&
      css`
        content: '';
      `};

    position: absolute;
    bottom: -8px;
    right: 0;
    width: 100%;
    height: 2px;
    background: #ff872c;
  } */

  & + a {
    margin-left: 32px;
  }

  &:hover {
    opacity: 0.6;
  }
`;
