import NavBar from './components/NavBar'
import './App.css'
import Home from './pages/Home';
import Footer from './components/Footer';
import { ThemeProvider, createTheme } from "@mui/material/styles";
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#592EA9",
      },
      black: {
        main: "#282828",
      },
    },
   
  });
  return (
    <>
    <ThemeProvider theme={theme}>
     <NavBar/>
     <Home/>
     <Footer/>
     </ThemeProvider>
    </>
  )
}

export default App
