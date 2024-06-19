import axiosInstance from '@/lib/axiosInstance';
import { HandleSignupParams, UserProfile } from '@/types/signupPage';

const handleSignup = async ({
  email,
  nickname,
  password,
}: HandleSignupParams): Promise<UserProfile> => {
  try {
    const response = await axiosInstance.post<UserProfile>('/users', {
      email,
      nickname,
      password,
    });

    if (response.status !== 201) {
      throw new Error(`Signup Error ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('Login Error', error);
    throw error;
  }
};

export default handleSignup;
