import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 4.8rem;
  border: 0;

  background-color: ${props => props.background};
  color: ${({ theme }) => theme.COLORS.WHITE};

  border-radius: 5px;

  font-family: ${({ theme }) => theme.FONT.FONT_POPPINS};
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.4rem;
  text-align: center;
`;