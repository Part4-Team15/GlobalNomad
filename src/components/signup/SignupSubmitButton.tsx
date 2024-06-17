interface SignupSubmitButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
}
const SignupSubmitButton = ({ children, disabled = false }: SignupSubmitButtonProps) => (
  <button
    type="submit"
    disabled={disabled}
    className={`py-4 px-8 rounded-[6px] text-white text-lg font-semibold transition-opacity ${
      disabled ? 'bg-gray-400' : 'bg-blue-500 hover:opacity-90'
    }`}
  >
    {children}
  </button>
);

export default SignupSubmitButton;
