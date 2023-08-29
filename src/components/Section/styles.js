import styled from "styled-components";

export const Container = styled.section`
  margin-left: 2.4rem;

  > h2 {
    font-family: 'Poppins';
    font-weight: 500;
    font-size: clamp(1.8rem, 0.727rem + 1.489vw, 2.5rem);
    line-height: 140%;

    margin-bottom: 2.4rem;

    color: ${({ theme }) => theme.COLORS.GRAY_100};
  }
`