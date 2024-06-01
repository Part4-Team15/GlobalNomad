import { AssignData } from '@/types/assignActivityPage';

const defaultAssignData: AssignData = {
  title: '',
  category: '',
  description: '',
  price: 0,
  address: '',
  bannerImageUrl: '',
  subImageUrls: [],
  schedules: [],
};

const mergeAssignData = (
  oldData: AssignData | undefined,
  newData: Partial<AssignData>,
): AssignData => {
  return { ...defaultAssignData, ...oldData, ...newData };
};

export default mergeAssignData;
