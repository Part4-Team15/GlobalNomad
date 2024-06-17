import axios from 'axios';
import axiosInstance from '@/lib/axiosInstance';
import { ModifyData } from '@/types/modifyActivityPage';
import Toast from '@/utils/Toast';

const handleClose = () => {
  window.location.reload();
};

const patchModifyMyActivity = async (myActivity: ModifyData, id: string) => {
  try {
    const res = await axiosInstance.patch(`/my-activities/${Number(id)}`, myActivity);
    return res.data;
  } catch (e) {
    console.error('Error: ', e);
    if (axios.isAxiosError(e)) {
      const errorMessage = e.response?.data?.message || '수정 중 오류가 발생했습니다.';
      Toast.error(errorMessage, { onClose: handleClose });
    } else {
      Toast.error('수정 중 오류가 발생했습니다.', { onClose: handleClose });
    }
    return null;
  }
};

export default patchModifyMyActivity;
