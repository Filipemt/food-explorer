import styled from 'styled-components';

export const Container = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: .4rem .8rem;
  border-radius: 5px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_900};
  color: ${({ theme }) => theme.COLORS.WHITE};

  text-align: center;
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.FONT.FONT_POPPINS};
  font-weight: 500;
  line-height: 2.4rem;
`