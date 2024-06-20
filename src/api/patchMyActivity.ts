import axiosInstance from '@/lib/axiosInstance';
import { ModifyData } from '@/types/modifyActivityPage';

const patchModifyMyActivity = async (myActivity: ModifyData, id: string) => {
  try {
    const res = await axiosInstance.patch(`/my-activities/${Number(id)}`, myActivity);
    return res.data;
  } catch (e) {
    console.error('Error: ', e);
    throw e;
  }
};

export default patchModifyMyActivity;
