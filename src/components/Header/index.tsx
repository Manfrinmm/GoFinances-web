import React from 'react';

import { Container, Link } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  // const [activeItem, setActiveItem] = useState('list');

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <Link
            to="/"
            // active={activeItem === 'list' ? 1 : 0}
            // onClick={() => setActiveItem('list')}
          >
            Listagem
          </Link>
          <Link
            to="/import"
            // active={activeItem === 'import' ? 1 : 0}
            // onClick={() => setActiveItem('import')}
          >
            Importar
          </Link>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
