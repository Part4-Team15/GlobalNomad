const MyPageInputLabel = ({ labelName, inputName }: { labelName: string; inputName: string }) => (
  <label htmlFor={inputName} className="font-bold text-[#1b1b1b] text-[24px]">
    {labelName}
  </label>
);

export default MyPageInputLabel;
