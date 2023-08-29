import styled from 'styled-components';
import { Wrapper } from '../Home/styles';
import { fadeInAnimation } from '../SignIn/styles';

export const Container = styled.div`
  min-width: 30rem;
  height: 100vh;

  display: grid;

  grid-template-rows: 11.4rem auto;
  grid-template-areas: 
  "header"
  "content"
  "footer"
  ;
`

export { Wrapper }

export const Content = styled.div`
  grid-area: content;

  margin: 3.6rem 0 1.6rem 0;
  padding: 0 5.6rem;
  animation: ${fadeInAnimation} .5s;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

   a {
    align-self: flex-start;
    margin-bottom: 1.6rem;
  }

   img {
    width: clamp(16.5rem, 12.914rem + 13.404vw, 39rem);
    height:  clamp(16.5rem, 12.914rem + 13.404vw, 39rem);
    border-radius: 999px;
    object-fit: cover;
  }

   h2 {
    margin: 1.6rem 0 2.4rem 0;

    font-size: clamp(2.7rem, 1.318rem + 1.383vw, 4rem);
    font-family: Poppins;
    font-weight: 500;
    line-height: 140%;

    color: ${({ theme }) => theme.COLORS.GRAY_100};
  }

  p {
    font-size: clamp(1.6rem, 0.772rem + 0.851vw, 2.4rem);
    font-family: ${({ theme }) => theme.FONT.FONT_POPPINS};
    line-height: 140%;
  }

  @media(min-width: 1024px) {
    flex-direction: row;
    gap: 4.7rem;
    /* align-items: flex-start; */
    padding: 0 12.1rem;

    img {
      margin-top: 4.2rem;
    }
  }
`

export const Ingredients = styled.div`
  display: flex;
  gap: 2.4rem;

  flex-wrap: wrap;
  

  margin: 2.4rem 0 4.8rem 0;

  @media(min-width: 1024px) {
    justify-content: flex-start;
  }
`

export const Amount = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  width: 100%;

  div {
    align-items: center;
    gap: 1.4rem;
    margin: 1.2rem 0 1.6rem 0;
  }

  span {
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    font-family: ${({ theme }) => theme.FONT.FONT_ROBOTO};
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 160%;
  }

  .increment,
  .decrement{
    color: ${({ theme }) => theme.COLORS.WHITE};
    border: none;
    background: transparent;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 4.8rem;
    
    width: 100%;
    padding: 1.2rem 2.4rem;
    gap: .5rem;
    border-radius: .3rem;

    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_BUTTON_300};

    span {
      text-align: center;
      font-size: 1.3rem;
      font-family: ${({ theme }) => theme.FONT.FONT_POPPINS};
      font-weight: 500;
      line-height: 1.6rem;

      color: ${({ theme }) => theme.COLORS.WHITE};
    }

    @media(min-width: 1024px) {
      width: 20rem;
    }
  }
`

export const Purchase = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 4.8rem;
    
    width: 100%;
    /* padding: 1.2rem 2.4rem; */
    gap: .5rem;
    border-radius: .3rem;

    border: none;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_BUTTON_300};

    svg {
      color: ${({ theme }) => theme.COLORS.WHITE};
    }

    span {
      text-align: center;
      font-size: 1.3rem;
      font-family: ${({ theme }) => theme.FONT.FONT_POPPINS};
      font-weight: 500;
      line-height: 1.6rem;

      color: ${({ theme }) => theme.COLORS.WHITE};
    }

    @media(min-width: 1024px) {
      width: 20rem;
    }
`

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`