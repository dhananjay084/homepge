import { Formik, Form, Field } from 'formik';
import AuthLayout from '../components/AuthLayout';
import Lock from '../assets/lock.png'

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <div className="text-center">
        <img src={Lock} alt="lock" className="mx-auto w-12 mb-4" />
        <h2 className="text-lg font-bold">Forgot your password?</h2>
        <p className="text-sm text-gray-500 mt-1">
          Enter your registered email below to receive password reset instruction
        </p>
      </div>

      <Formik
        initialValues={{ email: '' }}
        onSubmit={() => window.location.href = "/password-sent"}
      >
        <Form className="mt-4">
          <Field name="email" type="email" placeholder="Input email address"
            className="w-full border p-2 mt-1 rounded" />
          <button type="submit" className="w-full bg-[#592EA9] text-white p-2 mt-4 rounded">
            Send
          </button>
        </Form>
      </Formik>

      <div className="text-center text-sm mt-4">
        You remember your password? <a className="text-[#592EA9]" href="/login">Login</a>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
