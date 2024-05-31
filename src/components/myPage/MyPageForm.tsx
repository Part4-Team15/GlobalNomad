import { useState, ChangeEvent, FormEvent } from 'react';
import MyPageInputBox from './MyPageInputBox';

const MyPageForm = () => {
  const [inputs, setInputs] = useState({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { nickname, email, password, passwordConfirm } = inputs;
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputs);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between font-bold">
        <div className="text-[#1b1b1b] text-[32px]">내정보</div>
        <button
          type="submit"
          form="myPageForm"
          className="text-[16px] text-white bg-[#112211] px-8 py-[10px] rounded"
        >
          저장하기
        </button>
      </div>
      <form
        className="flex flex-col gap-8"
        noValidate
        onSubmit={onSubmit}
        id="myPageForm"
      >
        <MyPageInputBox
          inputName="nickname"
          onChangeInput={onChangeInput}
          value={nickname}
          labelName="닉네임"
          inputType="text"
        />
        <MyPageInputBox
          inputName="email"
          onChangeInput={onChangeInput}
          value={email}
          labelName="이메일"
          inputType="email"
        />
        <MyPageInputBox
          inputName="password"
          onChangeInput={onChangeInput}
          value={password}
          labelName="비밀번호"
          inputType="password"
        />
        <MyPageInputBox
          inputName="passwordConfirm"
          onChangeInput={onChangeInput}
          value={passwordConfirm}
          labelName="비밀번호 재입력"
          inputType="password"
        />
      </form>
    </div>
  );
};

export default MyPageForm;
