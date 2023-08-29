import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 3.2rem;

  color: ${({ theme }) => theme.COLORS.WHITE};
  background-color: ${({ theme, isnew }) => isnew ? "transparent" : theme.COLORS.BACKGROUND_100};

  border: ${({ theme, isnew }) => isnew ? `1px dashed ${theme.COLORS.GRAY_500}` : "none"};

  border-radius: 1rem;
  padding: 1rem 1.6rem;

  button {
    border: none;
    background: none;
  }

  button {
    color: ${({ theme, isnew }) => isnew ? theme.COLORS.GRAY_500 : theme.COLORS.WHITE};

    display: flex;
    font-size: 2.4rem;
    align-items: center;
  }

  input {
    height: 5rem;
    width: 100%;

    font-family: ${({ theme }) => theme.FONT.FONT_ROBOTO};
    font-size: 1.6rem;
    line-height: 100%;

    color: ${({ theme }) => theme.COLORS.WHITE};
    background: transparent;  


    border: none;

    &::placeholder {
      color: ${({ theme }) => theme.COLORS.GRAY_500};

      font-family: ${({ theme }) => theme.FONT.FONT_ROBOTO};
      font-size: 1.6rem;
      line-height: 100%;
    }
  }


`;
