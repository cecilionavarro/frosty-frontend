import { ThemeProvider } from "./components/theme-provider"
import { LandingPage } from "./components/landing-page"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <LandingPage />
    </ThemeProvider>
  )
}
