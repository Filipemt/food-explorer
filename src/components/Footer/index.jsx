import { Container, Logo } from './styles';
import logoFooter from '../../assets/logoFooter.svg';

export function Footer() {
  return (
    <Container>
      <Logo>
        <img src={logoFooter} alt="Polígono Azul" />
        <p>Food Explorer</p>
      </Logo>

      <span>© 2023 - Todos os direitos reservados.</span>
    </Container>
  )
}