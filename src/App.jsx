import NavBar from './components/NavBar'
import './App.css'
import Home from './pages/Home';
import Footer from './components/Footer';
import AllCoupons from './pages/AllCoupons';
import AllCategories from './pages/AllCategories';
import AllStores from './pages/AllStores';
import StoreBranding from './pages/StoreBranding';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BankOffer from './pages/BankOffers';
import SingleCategory from './pages/SingleCategory';
import IndividualStore from './pages/IndividualStore';

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
        <Route path="/allcoupons" element={<AllCoupons />} />
        <Route path ="/allcategories" element={<AllCategories/>}/>
        <Route path ="/allstores" element={<AllStores/>}/>
        <Route path ="/storebranding" element={<StoreBranding/>}/>
        <Route path ='/bankoffer' element={<BankOffer/>}/>
<Route path='/category' element={<SingleCategory/>}/>
<Route path ='store' element={<IndividualStore/>}/>

      </Routes>
     <Footer/>
     </BrowserRouter>
     </ThemeProvider>
    </>
  )
}

export default App
