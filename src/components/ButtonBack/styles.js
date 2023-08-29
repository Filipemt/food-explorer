import styled from "styled-components";

export const Container = styled.button`
    display: flex;
    align-items: center;
    border: none;
    background-color: transparent;

    font-size: ${(props) => props.fontSize};
    font-family: ${({ theme }) => theme.FONT.FONT_POPPINS};
    font-weight: 500;
    line-height: 140%;

    color: ${({ theme }) => theme.COLORS.GRAY_100};

    svg {
      font-size: ${(props) => props.size};
    }
`