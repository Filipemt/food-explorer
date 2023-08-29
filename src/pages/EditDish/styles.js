import styled from 'styled-components';
import { Wrapper } from '../Home/styles';
import { Container, Content, Ingredients } from '../AddDish/styles';


export { Container }

export { Wrapper }

export { Content }

export { Ingredients }

export const Form = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    }

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }

  > div:nth-child(4) {
      display: flex;
      gap: 3.2rem;
    }

  @media(min-width: 1024px) {
    > div:nth-child(1) {
      display: flex;
      flex-direction: row;
      gap: 3.2rem;
      align-items: center;
    }

    > div:nth-child(2) {
      display: flex;
      flex-direction: row;
      gap: 3.2rem;
      align-items: center;
    }

    > div:nth-child(4) {
      width: 50rem;
      align-self: flex-end;
    }
  }
`