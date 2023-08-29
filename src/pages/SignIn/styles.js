import styled, { keyframes } from 'styled-components';

const animation = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;

export const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.main`
  min-width: 42.8rem;

  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  min-width: 31.6rem;
  
  .logo {
    align-self: flex-start;
  }
  
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    width: 100%;
    
    animation: ${animation} .9s;
  }

  .wrapper h1 {
    display: none;

  }

  .inputs {
    width: 100%;
    margin: 7.2rem 0 3.2rem 0;

    display: flex;
    flex-direction: column;
    gap: 3.2rem;

    animation: ${fadeInAnimation} .7s;
    animation-delay: 0.3s;
    animation-fill-mode: backwards;
  }

  a {
    margin-top: 3.2rem;

    font-family: ${({ theme }) => theme.FONT.FONT_POPPINS};
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.4rem;
    color: ${({ theme }) => theme.COLORS.WHITE};
  }


  @media(min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 10.8rem;
    max-width: 1368px;

    .logo {
      align-self: center;
    }

    .wrapper {
      max-width: 50rem;
      min-height: 54rem;

      background-color: ${({ theme }) => theme.COLORS.BACKGROUND_SIGN};

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 3.2rem;
      
      padding: 6.4rem;
      border-radius: 1.6rem;
    }

    .inputs {
      gap: 3.2rem;
      margin: 0;
    }
    
    a {
      margin: 0;
    }

    .wrapper h1 {
      font-family: ${({ theme }) => theme.FONT.FONT_POPPINS};
      font-weight: 500;
      font-size: 3.2rem;
      line-height: 140%;

      display: flex;
    }

  }
`;