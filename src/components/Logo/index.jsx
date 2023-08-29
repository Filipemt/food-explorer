import { Container } from './styles';
import logo from '../../assets/logo.svg';

export function Logo({ fontSize, width, height, display, isAdmin }) {
  return (
    <Container fontSize={fontSize} display={display} isadmin={isAdmin ? 1 : 0}>
      <div>
        <img src={logo} width={width} height={height} alt="Polígono Azul" />
        {isAdmin && <p>admin</p>}
      </div>
      <h1 >Food Explorer</h1>
    </Container >
  )
}