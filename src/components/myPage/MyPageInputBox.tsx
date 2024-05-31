import { ChangeEvent } from 'react';
import MyPageInputLabel from './MyPageInputLabel';

interface MyPageInputBoxProps {
  inputName: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  labelName: string;
  inputType: string;
}
const MyPageInputBox = ({
  inputName,
  onChangeInput,
  value,
  labelName,
  inputType,
}: MyPageInputBoxProps) => {
  return (
    <div className="flex flex-col w-[792px] gap-4">
      <MyPageInputLabel labelName={labelName} />
      <input
        className="w-full py-4 pl-4 border border-gray-50 rounded"
        type={inputType}
        id={inputName}
        onChange={onChangeInput}
        value={value}
        name={inputName}
      />
    </div>
  );
};

export default MyPageInputBox;
