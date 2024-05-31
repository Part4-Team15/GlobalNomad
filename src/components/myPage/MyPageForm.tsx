import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import getUserInfo from '@/api/getUserInfo';

import editMyInformation from '@/api/editMyInformation';
import queryClient from '@/lib/queryClient';
import { EditInformationErrorMessageType } from '@/types/signupPage';
import { AxiosError } from 'axios';
import MyPageInputBox from './MyPageInputBox';

const MyPageForm = ({ uploadedImage }: { uploadedImage: string | null }) => {
  const [inputs, setInputs] = useState({
    nickname: '',
    email: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const [editInformationErrorMessage, setEditInformationErrorMessage] =
    useState<EditInformationErrorMessageType>({
      nicknameErrorMessage: null,
      passwordErrorMessage: null,
      passwordConfirmErrorMessage: null,
      unexpectedErrorMessage: null,
    });
  const PASSWORD_MIN_LENGTH = 8;
  const { data, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
  });

  const newPasswordConfirmFocusOut = () => {
    if (inputs.newPassword !== inputs.newPasswordConfirm) {
      setEditInformationErrorMessage((prev) => ({
        ...prev,
        passwordErrorMessage: '비밀번호가 일치하지 않습니다.',
      }));
    } else {
      setEditInformationErrorMessage((prev) => ({
        ...prev,
        passwordErrorMessage: null,
      }));
    }
  };

  const { mutate } = useMutation({
    mutationFn: editMyInformation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        const { nickname, newPassword } = inputs;
        if (error.request.status === 400) {
          // 닉네임 확인
          if (nickname.length === 0) {
            setEditInformationErrorMessage((prev) => ({
              ...prev,
              nicknameErrorMessage: '닉네임을 입력해주세요.',
            }));
          } else if (nickname.length > 10) {
            setEditInformationErrorMessage((prev) => ({
              ...prev,
              nicknameErrorMessage: '닉네임은 10자 이하로 작성해주세요.',
            }));
          } else {
            setEditInformationErrorMessage((prev) => ({
              ...prev,
              nicknameErrorMessage: null,
            }));
            // 비밀번호 확인
            if (newPassword.length === 0) {
              setEditInformationErrorMessage((prev) => ({
                ...prev,
                passwordErrorMessage: '비밀번호를 입력해주세요.',
              }));
            } else if (
              newPassword.length > 0 &&
              newPassword.length < PASSWORD_MIN_LENGTH
            ) {
              setEditInformationErrorMessage((prev) => ({
                ...prev,
                passwordErrorMessage: '8자 이상 작성해 주세요.',
              }));
            } else {
              setEditInformationErrorMessage((prev) => ({
                ...prev,
                passwordErrorMessage: null,
              }));
            }
          }
        }
      }
    },
  });

  useEffect(() => {
    if (data) {
      setInputs({
        nickname: data.nickname,
        email: data.email,
        newPassword: '',
        newPasswordConfirm: '',
      });
    }
  }, [isSuccess, data]);
  const { nickname, email, newPassword, newPasswordConfirm } = inputs;
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const profileImageUrl = uploadedImage ?? data?.profileImageUrl ?? null;
    if (newPassword !== newPasswordConfirm) {
      if (newPassword.length > 0 && newPassword.length < PASSWORD_MIN_LENGTH) {
        setEditInformationErrorMessage((prev) => ({
          ...prev,
          passwordErrorMessage: '8자 이상 작성해 주세요.',
        }));
      }
      if (newPasswordConfirm.length === 0) {
        setEditInformationErrorMessage((prev) => ({
          ...prev,
          passwordConfirmErrorMessage: '비밀번호 확인값을 입력해주세요.',
        }));
      } else {
        setEditInformationErrorMessage((prev) => ({
          ...prev,
          passwordErrorMessage: '비밀번호가 일치하지 않습니다.',
        }));
      }

      return;
    }

    // 비밀번호가 일치하면 에러 메시지 초기화
    setEditInformationErrorMessage((prev) => ({
      ...prev,
      passwordConfirmErrorMessage: null,
    }));
    mutate({
      nickname,
      profileImageUrl,
      newPassword,
    });
  };

  console.log(editInformationErrorMessage);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between font-bold">
        <div className="text-[#1b1b1b] text-[32px]">내정보</div>
        <button
          type="submit"
          form="myPageForm"
          className="text-[16px] text-white bg-[#112211] px-8 py-[10px] rounded cursor-pointer"
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
          editInformationErrorMessage={editInformationErrorMessage}
          setEditInformationErrorMessage={setEditInformationErrorMessage}
        />
        <MyPageInputBox
          inputName="email"
          value={email}
          labelName="이메일"
          inputType="email"
        />
        <MyPageInputBox
          inputName="newPassword"
          onChangeInput={onChangeInput}
          value={newPassword}
          labelName="비밀번호"
          inputType="password"
          editInformationErrorMessage={editInformationErrorMessage}
          setEditInformationErrorMessage={setEditInformationErrorMessage}
        />
        <MyPageInputBox
          inputName="newPasswordConfirm"
          onChangeInput={onChangeInput}
          value={newPasswordConfirm}
          labelName="비밀번호 재입력"
          inputType="password"
          editInformationErrorMessage={editInformationErrorMessage}
          setEditInformationErrorMessage={setEditInformationErrorMessage}
          onFocusOut={newPasswordConfirmFocusOut}
        />
      </form>
    </div>
  );
};

export default MyPageForm;
