import axiosInstance from '@/lib/axiosInstance';
import { AssignData } from '@/types/assignActivityPage';

const postAssignMyActivity = async (myActivity: AssignData) => {
  try {
    const res = await axiosInstance.post('/activities', myActivity);
    return res.data;
  } catch (e) {
    console.error('Error: ', e);
    return null;
  }
};

export default postAssignMyActivity;
