interface AuthLabelProps {
  labelName: string;
  inputName: string;
}

const AuthLabel = ({ labelName, inputName }: AuthLabelProps) => (
  <label htmlFor={inputName} className="text-base text-[#1B1B1B] dark:text-darkMode-white-10">
    {labelName}
  </label>
);

export default AuthLabel;
