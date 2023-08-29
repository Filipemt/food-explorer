import styled from 'styled-components';

export const Container = styled.footer`
  grid-area: footer;
  display: flex;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};

  width: 100%;
  height: 7.7rem;

  padding: 2.4rem 2rem;
  align-items: center;

  margin-top: 2.4rem;

  align-self: flex-end;

  span {
    font-size: clamp(1.2rem, 0.693rem + 0.213vw, 1.4rem);
    font-family: ${({ theme }) => theme.FONT.FONT_DM};
    color: ${({ theme }) => theme.COLORS.WHITE_200};

  }

  @media(min-width: 1024px) {
    padding: 2.4rem 12.4rem;
  }
`

export const Logo = styled.div`
  display: flex;
  gap: .6rem;

  align-items: center;

    img {
      width: clamp(2.2rem, 1.147rem + 0.851vw, 3rem);
    }

    p {
      font-size: clamp(1rem, 0.681rem + 0.957vw, 2rem);
      font-family: ${({ theme }) => theme.FONT.FONT_ROBOTO};
      font-weight: 700;

      color: ${({ theme }) => theme.COLORS.GRAY_700};
    }
`