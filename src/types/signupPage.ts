export interface SignupErrorType {
  emailErrorMessage: string | null;
  nicknameErrorMessage: string | null;
  passwordErrorMessage: string | null;
  passwordConfirmErrorMessage: string | null;
  unexpectedErrorMessage: string | null;
}

export interface EditInformationErrorMessageType {
  nicknameErrorMessage: string | null;
  passwordErrorMessage: string | null;
  passwordConfirmErrorMessage: string | null;
  unexpectedErrorMessage: string | null;
}

export interface HandleSignupParams {
  email: string;
  nickname: string;
  password: string;
}

export interface UserProfile {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignupErrorMessages {
  emailErrorMessage: string;
  nicknameErrorMessage: string;
  passwordErrorMessage: string;
  passwordConfirmErrorMessage: string;
}
