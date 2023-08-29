import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle, keyframes } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  *::-webkit-scrollbar {
    width: 0.8rem;
 
  }

  *::-webkit-scrollbar-track {
    background-color: transparent;
  
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    border-radius: 10rem;
  }  


  body {
    background: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    color: ${({ theme }) => theme.COLORS.WHITE};
    overflow: hidden;
  }

  body, input, button, textarea {
    font-size: 1.6rem;
    outline: none;
  }

  body::-webkit-scrollbar {
    width: 0px;
  }

  body::-webkit-scrollbar-track {
    -webkit-box-shadow: none;
  }

  body::-webkit-scrollbar-thumb {
    background: white;
    -webkit-box-shadow: none;
  }

  body::-webkit-scrollbar-thumb:window-inactive {
    background: none;
  }

  a {
    text-decoration: none;
  }

  button, a {
    cursor: pointer;
    transition: filter 0.2s;
  }

  button:hover,
  a:hover {
    filter: brightness(0.9);
  }

  .Toastify__toast-body {
    font-size: 1.4rem;

    @media(min-width: 1024px) {
    font-size: 1.6rem;
    }
  }

  .Toastify__toast-container {
    width: 36rem;

    @media(min-width: 1024px) {
    width: 32rem;
    }
  }
`;