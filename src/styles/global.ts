import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
  }

  body {
    background: ${(props) => props.theme['gray-700']};
    color: ${(props) => props.theme['gray-300']};
    -webkit-font-smoothing: antialised;
  }

  body, input, textarea, button, select {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  @media (max-width: 1180px) {
    html {
      font-size: 87.5%;
    }
  }
`
