import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";

import NavBar from './components/NavBar';
import Footer from './components/Footer';

import Home from './pages/Home';
import AllCoupons from './pages/AllCoupons';
import AllCategories from './pages/AllCategories';
import AllStores from './pages/AllStores';
// import StoreBranding from './pages/StoreBranding';
// import BankOffer from './pages/BankOffers';
import SingleCategory from './pages/SingleCategory';
import IndividualStore from './pages/IndividualStore';
import DealDetails from './pages/DealDetails';

import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgetPassword';
import PasswordSent from './pages/PasswordSent';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Blogs from './pages/Blogs'

import DealsAdmin from './Dashboard/Deals';
import StoreAdmin from './Dashboard/Stores';
import CategoryAdmin from './Dashboard/Categories';
import ReviewAdmin from './Dashboard/Reviews';
import BlogsAdmin from './Dashboard/Blogs';
import HomeAdmin from './Dashboard/Home';



function LayoutWrapper({ children }) {
  const location = useLocation();
  const authRoutes = ['/login', '/signup', '/forgot-password', '/password-sent','/profile','/edit-profile'];
  const isAuthRoute = authRoutes.includes(location.pathname);

  return (
    <>
      {isAuthRoute ? '': <NavBar />}
      {children}
      {isAuthRoute ? '': <Footer />}
    </>
  );
}

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
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allcoupons" element={<AllCoupons />} />
            <Route path="/allcategories" element={<AllCategories />} />
            <Route path="/allstores" element={<AllStores />} />
            {/* <Route path="/storebranding" element={<StoreBranding />} /> */}
            {/* <Route path="/bankoffer" element={<BankOffer />} /> */}
            <Route path="/category" element={<SingleCategory />} />
            <Route path="/store/:id" element={<IndividualStore />} />
            <Route path="/deal/:id" element={<DealDetails/>}/>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/password-sent" element={<PasswordSent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path='/admin/deals' element={<DealsAdmin/>}/>
            <Route path='/admin/stores' element={<StoreAdmin/>}/>
            <Route path='/admin/category' element={<CategoryAdmin/>}/>
            <Route path='/admin/review' element={<ReviewAdmin/>}/>
            <Route path='/admin/blogs' element={<BlogsAdmin/>}/>
            <Route path='/admin/home' element={<HomeAdmin/>}/>




          </Routes>
        </LayoutWrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
