import AuthLayout from '../components/AuthLayout';
import Message from "../assets/Message.png"

const PasswordSent = () => {
  return (
    <AuthLayout>
      <div className="text-center mt-16">
        <img src={Message} alt="check" className="mx-auto w-12 mb-4" />
        <h2 className="text-lg font-bold text-black">
          We have sent a password recover instructions to your email
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Did not receive the email? Check your spam filter or resend
        </p>
      </div>
    </AuthLayout>
  );
};

export default PasswordSent;
