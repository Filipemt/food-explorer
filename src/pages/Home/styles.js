import styled from "styled-components";
import { fadeInAnimation } from "../SignIn/styles";


export const Container = styled.main`
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

export const Wrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  grid-area: content;
  `

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  animation: ${fadeInAnimation} 0.4s;
  animation-delay: 0.3s;
  animation-fill-mode: backwards;
  
  @media(min-width: 1024px) {
    padding: 0 12.4rem;
  }
`

export const Description = styled.div`
  min-width: 42rem;
  margin: 4.4rem auto 6rem;
  border-radius: .2rem;


  font-family: ${({ theme }) => theme.FONT.FONT_POPPINS};

  display: flex;
  align-items: center;

  position: relative;
  
  &::after {
    content: "";
    background: linear-gradient(180deg, #091E26 0%, #00131C 100%);
    position: absolute;
    width: 100%;
    height: 85%;
    z-index: -1;
    bottom: 0;
    left: 15px;
  }

  img {
    width:clamp(11.938rem, -0.612rem + 46.915vw, 39.5rem);
    object-fit: cover;
    align-self: end;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: .3rem;

    h2 {
      font-weight: 600;
      font-size: 1.8rem;
      line-height: 140%;
      color: ${({ theme }) => theme.COLORS.GRAY_100};
    }

    p {
      font-weight: 400;
      font-size: 12px;
      line-height: 140%;
      color: ${({ theme }) => theme.COLORS.GRAY_100};
    }
  }

  @media(min-width: 1024px) {
    width: 112rem;
    height: 26rem;

    div {
      margin-left: 2rem;

      h2 {
      font-size: 4.0rem;
      font-weight: 500;
    }

    p {
      font-size: 1.6rem;
      line-height: 100%;
    }
    }
  }
`

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`

export const NotFound = styled.h2`
  align-self: center;
  height: 100vh;

  font-family: ${({ theme }) => theme.FONT.FONT_ROBOTO};
  font-size: clamp(1.4rem, 0.727rem + 1.489vw, 2.5rem);
  font-weight: 500;
  line-height: 140%;
  color: ${({ theme }) => theme.COLORS.GRAY_300};

  a {
    color: ${({ theme }) => theme.COLORS.GRAY_100};
  }
`