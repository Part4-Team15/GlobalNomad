interface AuthLabelProps {
  labelName: string;
}

const AuthLabel = ({ labelName }: AuthLabelProps) => (
  <label
    htmlFor="email"
    className="font-['Pretendard'] text-base text-[#1B1B1B]"
  >
    {labelName}
  </label>
);

export default AuthLabel;
