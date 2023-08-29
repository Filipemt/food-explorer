import { Container } from "./styles"

export function Loading() {
  return (
    <Container >
      <div className="ui-loader loader-blk">
        <svg viewBox="22 22 44 44" className="multiColor-loader">
          <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" className="loader-circle loader-circle-animation"></circle>
        </svg>
      </div>
    </Container>
  )
}