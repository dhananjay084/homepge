import { Formik, Form, Field } from 'formik';
import AuthLayout from '../components/AuthLayout';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
const Signup = () => {
  return (
    <AuthLayout>

        <h2 className='text-2xl text-center'>Sign Up</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        onSubmit={values => console.log(values)}
      >
        <Form>
          <label className="text-sm">Your name</label>
          <Field name="name" className="w-full border p-2 mt-1 mb-3 rounded" />

          <label className="text-sm">Email address</label>
          <Field name="email" type="email" className="w-full border p-2 mt-1 mb-3 rounded" />

          <label className="text-sm">Password</label>
          <Field name="password" type="password" className="w-full border p-2 mt-1 mb-3 rounded" />

          <label className="text-sm">Confirm Password</label>
          <Field name="confirmPassword" type="password" className="w-full border p-2 mt-1 mb-3 rounded" />

          <button type="submit"
            className="w-full bg-[#592EA9] text-white p-2 rounded mt-4">
            Sign up
          </button>
        </Form>
      </Formik>

      <div className="my-4 text-center text-xs text-gray-500">Or sign up with</div>
      <div className="space-y-2">
          <button className="w-full shadow-md p-2 rounded flex items-center justify-center gap-2">
            <GoogleIcon/> Continue with Google
          </button>
          <button className="w-full bg-[#1877F2] text-white p-2 rounded flex items-center justify-center gap-2"><FacebookIcon/>Continue with Facebook</button>
          <button className="w-full bg-black text-white p-2 rounded flex items-center justify-center gap-2"><AppleIcon/>Continue with Apple</button>
        </div>

      <div className="text-center text-sm mt-4">
        Already have an account? <a className="text-[#592EA9]" href="/login">Sign in</a>
      </div>
    </AuthLayout>
  );
};

export default Signup;
