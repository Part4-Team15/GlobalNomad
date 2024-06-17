import { FormEvent, useEffect } from 'react';

import useMyProfileInput from '@/hooks/useMyProfileInput';
import useEditProfile from '@/hooks/useEditProfile';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import { MyPageFormProps } from '@/types/myProfile';
import MyPageInputBox from './MyPageInputBox';

const MyPageForm = ({ uploadedImage, isShowProfileForm, isShowDefaultImage }: MyPageFormProps) => {
  const { inputs, setInputs, onChangeInput } = useMyProfileInput();

  const { nickname, email, newPassword, newPasswordConfirm } = inputs;

  const { mutation, editProfileErrorMessages, setEditProfileErrorMessages } = useEditProfile();

  const { mutate } = mutation;

  const { userInfo } = useUserInfoQuery();
  useEffect(() => {
    if (userInfo) {
      setInputs({
        nickname: userInfo.nickname,
        email: userInfo.email,
        newPassword: '',
        newPasswordConfirm: '',
      });
    }
  }, [userInfo]);
  const newPasswordConfirmFocusOut = () => {
    if (inputs.newPassword !== inputs.newPasswordConfirm) {
      setEditProfileErrorMessages((prev) => ({
        ...prev,
        newPasswordConfirmErrorMessage: '비밀번호가 일치하지 않습니다.',
      }));
    } else {
      setEditProfileErrorMessages((prev) => ({
        ...prev,
        newPasswordConfirmErrorMessage: '',
      }));
    }
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== newPasswordConfirm && newPassword.length >= 8) {
      setEditProfileErrorMessages((prev) => ({
        ...prev,
        newPasswordConfirmErrorMessage: '비밀번호가 일치하지 않습니다.',
      }));

      return;
    }
    let profileImageUrl: string | null = null;

    if (!isShowDefaultImage && userInfo) {
      profileImageUrl = uploadedImage || userInfo.profileImageUrl || null; // Assign value based on conditions
    }

    mutate({
      nickname,
      profileImageUrl,
      newPassword,
    });
  };

  return (
    <div
      className={`flex flex-col gap-4 ${isShowProfileForm ? '' : 'sm:hidden'} w-[729px] md:flex-grow sm:w-full`}
    >
      <div className="flex justify-between font-bold">
        <h1 className="text-[#1b1b1b] text-[32px] w-[91px] h-[38px]">내정보</h1>
        <button
          type="submit"
          form="myPageForm"
          className="text-[16px] text-white bg-[#112211] px-8 py-[10px] rounded cursor-pointer"
        >
          저장하기
        </button>
      </div>
      <form
        className="flex flex-col gap-8 sm:pb-[230px]"
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
          placeholder="닉네임을 입력해주세요"
          editProfileErrorMessages={editProfileErrorMessages}
          setEditProfileErrorMessages={setEditProfileErrorMessages}
        />
        <MyPageInputBox inputName="email" value={email} labelName="이메일" inputType="email" />
        <MyPageInputBox
          inputName="newPassword"
          onChangeInput={onChangeInput}
          value={newPassword}
          labelName="비밀번호"
          inputType="password"
          editProfileErrorMessages={editProfileErrorMessages}
          setEditProfileErrorMessages={setEditProfileErrorMessages}
          placeholder="8자 이상 입력해 주세요"
        />
        <MyPageInputBox
          inputName="newPasswordConfirm"
          onChangeInput={onChangeInput}
          value={newPasswordConfirm}
          labelName="비밀번호 재입력"
          inputType="password"
          editProfileErrorMessages={editProfileErrorMessages}
          setEditProfileErrorMessages={setEditProfileErrorMessages}
          onFocusOut={newPasswordConfirmFocusOut}
          placeholder="비밀번호를 한번 더 입력해 주세요"
        />
      </form>
    </div>
  );
};

export default MyPageForm;
