import { Formik, Form, Field } from 'formik';
import AuthLayout from '../components/AuthLayout';
import Banner from '../components/Minor/Banner';
import Image from '../assets/banner-image.webp'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
const Login = () => {
  return (
    <>
      {/* <NavBarAuth /> */}
      <AuthLayout>
                    <Banner Text="Every day we  the most interesting things" ColorText="discuss" BgImage={Image}  />
        
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={values => console.log(values)}
        >
          <Form className="mt-4">
            <label className="text-sm">Email address</label>
            <Field name="email" type="email" placeholder="Input email address"
              className="w-full border p-2 mt-1 rounded" />
            
            <label className="text-sm mt-4 block">Password</label>
            <Field name="password" type="password" placeholder="Input your password"
              className="w-full border p-2 mt-1 rounded" />

            

            <button type="submit"
              className="w-full bg-[#592EA9] text-white p-2 rounded mt-4">
              Login
            </button>
            <div className="text-center mt-2 text-sm text-[#592EA9] my-4">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
          </Form>
        </Formik>

        <div className="space-y-2">
          <button className="w-full shadow-md p-2 rounded flex items-center justify-center gap-2">
            <GoogleIcon/> Continue with Google
          </button>
          <button className="w-full bg-[#1877F2] text-white p-2 rounded flex items-center justify-center gap-2"><FacebookIcon/>Continue with Facebook</button>
          <button className="w-full bg-black text-white p-2 rounded flex items-center justify-center gap-2"><AppleIcon/>Continue with Apple</button>
        </div>

        <div className="text-center text-sm mt-4">
          You don’t have an account? <a className="text-[#592EA9]" href="/signup">Sign up</a>
        </div>
      </AuthLayout>
      {/* <FooterAuth /> */}
    </>
  );
};

export default Login;
