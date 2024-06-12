import axiosInstance from '@/lib/axiosInstance';

export interface HandleSignupType {
  email: string;
  nickname: string;
  password: string;
}

class SignupError extends Error {
  status: number;

  constructor(status: number) {
    super('Signup Error');
    this.status = status;
    this.name = 'SignupError';
  }
}

const handleSignup = async ({
  email,
  nickname,
  password,
}: HandleSignupType): Promise<any> => {
  const response = await axiosInstance.post('/users', {
    email,
    nickname,
    password,
  });

  if (response.status !== 201) {
    throw new SignupError(response.status);
  }
  return response;
};

export default handleSignup;
