import axiosInstance from '../lib/axiosInstance';

export interface HandleLoginParams {
  email: string;
  password: string;
}

export interface LoginDataResponse {
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  refreshToken: string;
  accessToken: string;
}

const handleLogin = async ({ email, password }: HandleLoginParams): Promise<LoginDataResponse> => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });

    // status가 201이 아닐경우 에러발생
    if (response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Login Error', error);
    throw error;
  }
};

export default handleLogin;
