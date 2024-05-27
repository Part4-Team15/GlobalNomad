import axiosInstance from '../lib/axiosInstance';

interface HandleLoginProps {
  email: string;
  password: string;
}

class LoginError extends Error {
  status: number;

  constructor(status: number) {
    super('Login Error');
    this.status = status;
    this.name = 'LoginError';
  }
}

const handleLogin = async ({
  email,
  password,
}: HandleLoginProps): Promise<any> => {
  const response = await axiosInstance.post('/auth/login', {
    email,
    password,
  });

  // status가 201이 아닐경우 에러발생
  if (response.status !== 201) {
    throw new LoginError(response.status);
  }

  return response;
};

export default handleLogin;
