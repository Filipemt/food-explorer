import { Container } from './styles';

export function Textarea({ title, id, ...rest }) {
  return (
    <Container>
      <label htmlFor={id}>{title}</label>
      <textarea required id={id} {...rest}></textarea>
    </Container>
  );
}