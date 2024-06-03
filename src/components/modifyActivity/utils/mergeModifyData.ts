import { ModifyData } from '@/types/modifyActivityPage';

const defaultModifyData: ModifyData = {
  title: '',
  category: '',
  description: '',
  price: 0,
  address: '',
  bannerImageUrl: '',
  subImageIdsToRemove: [],
  subImageUrlsToAdd: [],
  scheduleIdsToRemove: [],
  schedulesToAdd: [],
};

const mergeModifyData = (
  oldData: ModifyData | undefined,
  newData: Partial<ModifyData>,
): ModifyData => {
  return { ...defaultModifyData, ...oldData, ...newData };
};

export default mergeModifyData;
