interface AuthLabelProps {
  labelName: string;
  inputName: string;
}

const AuthLabel = ({ labelName, inputName }: AuthLabelProps) => (
  <label htmlFor={inputName} className="text-base text-[#1B1B1B]">
    {labelName}
  </label>
);

export default AuthLabel;
