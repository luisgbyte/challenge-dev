import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { Container } from './components/Container'
import { Home } from './pages/Home'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <Home />
      </Container>
      <GlobalStyle />
    </ThemeProvider>
  )
}
