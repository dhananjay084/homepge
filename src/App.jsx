import NavBar from './components/NavBar'
import './App.css'
import Home from './pages/Home';
import Footer from './components/Footer';
import AllCoupons from './pages/AllCoupons';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
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
      disabled: {
        main: "#AAA6B1",
      },
    },
   
  });
  return (
    <>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
     <NavBar/>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coupons" element={<AllCoupons />} />
      </Routes>
     <Footer/>
     </BrowserRouter>
     </ThemeProvider>
    </>
  )
}

export default App
