import { Container } from './styles'

export function Section({ title, children, ...rest }) {
  return (
    <Container {...rest}>
      <h2>
        {title}
      </h2>
      <div>
        {children}
      </div>
    </Container>
  )
}