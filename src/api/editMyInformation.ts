import axiosInstance from '@/lib/axiosInstance';
import { EditProfileResponse } from '@/types/myProfile';

export interface EditMyInformationParams {
  nickname: string;
  profileImageUrl: string | null;
  newPassword: string;
}

const editMyInformation = async ({
  nickname,
  profileImageUrl,
  newPassword,
}: EditMyInformationParams): Promise<EditProfileResponse> => {
  try {
    const response = await axiosInstance.patch('/users/me', {
      nickname,
      profileImageUrl,
      newPassword,
    });

    if (response.status !== 200) {
      throw new Error(`Edit Profile Error: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export default editMyInformation;
