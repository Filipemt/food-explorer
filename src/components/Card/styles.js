import styled from "styled-components";

export const Container = styled.div`
  min-width: 21rem;
  height: fit-content;
  background: ${({ theme }) => theme.COLORS.BACKGROUND_CARD};

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.4rem;

  border: 1px solid #000204;
  border-radius: .8rem;

  > img {
    width: clamp(8.8rem, 2.996rem + 9.362vw, 17.6rem);
    height: clamp(8.8rem, 2.996rem + 9.362vw, 17.6rem);
    border-radius: 999px;
    object-fit: cover;
  }

  .favorite {
    align-self: flex-end;
    border: none;
    background-color: transparent;
    display: ${({ admin }) => admin ? 'none' : 'flex'};

    svg{
      fill: ${({ theme, isfavorite }) => isfavorite ? theme.COLORS.RED : theme.COLORS.WHITE};
    }
  }

  .admin {
    align-self: flex-end;
    
    svg{
      fill: ${({ theme }) => theme.COLORS.WHITE};
    }
  }

  @media(min-width: 1024px) {
    height: fit-content;
    max-height: 46rem;
    min-width: 30rem;
    max-width: 34rem;
  }
`

export const Amount = styled.div`
  display: ${({ admin }) => admin ? 'none' : 'flex'};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  
  > div:nth-child(1) {
    display: flex;
    align-items: center;
    gap: 1.4rem;
    margin: 1.2rem 0 1.6rem 0;
  }

  > div:nth-child(2) {
    width: 100%;
  }

  span {
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    font-family: ${({ theme }) => theme.FONT.FONT_ROBOTO};
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 100%;
  }

  .increment,
  .decrement{
    color: ${({ theme }) => theme.COLORS.WHITE};
    border: none;
    background: transparent;
  }

  @media(min-width: 1024px) {
    flex-direction: row;
    gap: 1.6rem;
    margin-top: 1.5rem;

    span {
      font-size: 2rem;
      font-weight: 700;
    }
  }
`

export const DishName = styled.div`
  display: flex;
  align-items: center;
  margin: 1.2rem 0 ;

  p {
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    text-align: center;

    font-family: ${({ theme }) => theme.FONT.FONT_POPPINS};
    font-weight: 500;
    font-size: clamp(1.4rem, 0.59rem + 1.064vw, 2.4rem);
    line-height: 2.4rem;
  }

  a {
    display: flex;
    align-items: center;
    gap: .2rem;
    
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    border: none;
    background: transparent;
  }
`

export const Value = styled.span`
  font-family: ${({ theme }) => theme.FONT.FONT_ROBOTO};
  font-weight: 400;
  font-size: clamp(1.6rem, 0.545rem + 1.702vw, 3rem);


  text-align: center;

  color: ${({ theme }) => theme.COLORS.CYAN};
`

export const Description = styled.div`

  > span {
  display: none;
  }
  
@media(min-width: 1024px) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  > span {
    display: block;
    text-align: center;
    font-size: 1.4rem;
    font-family: ${({ theme }) => theme.FONT.FONT_ROBOTO};
    line-height: 160%;

    color: ${({ theme }) => theme.COLORS.GRAY_300};
    max-width: 25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
`