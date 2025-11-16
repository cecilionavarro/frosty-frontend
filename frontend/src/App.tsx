
import Layout from "./components/Layout"
import PromptInput from "./components/PromptInput"
import { ThemeProvider } from "./components/ThemeProvider"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <div className="flex justify-center items-end h-svh px-5 py-5 md:px-10">
          <PromptInput />
        </div>
      </Layout>
    </ThemeProvider>
  )
}

export default App
