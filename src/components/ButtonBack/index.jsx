import { Container } from "./styles";
import { IoIosArrowBack } from "react-icons/io";


export function ButtonBack({ fontSize, size, ...rest }) {
  return (
    <Container fontSize={fontSize} size={size} {...rest}>
      <IoIosArrowBack />
      voltar
    </Container>
  )
}