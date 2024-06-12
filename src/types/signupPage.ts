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
