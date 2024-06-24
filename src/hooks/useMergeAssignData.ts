import { useQueryClient } from '@tanstack/react-query';
import { Address } from 'react-daum-postcode';
import { AssignData, Schedule } from '@/types/assignActivityPage';
import queryKeys from '@/api/reactQuery/queryKeys';
import mergeAssignData from '@/components/assignActivity/utils/mergeAssignData';
import { Category } from '@/types/category';

const useMergeAssignData = () => {
  const queryClient = useQueryClient();

  const mergeAddress = (data: Address) => {
    queryClient.setQueryData<AssignData>(queryKeys.assignData(), (oldData) => {
      return mergeAssignData(oldData, { address: data.address });
    });
  };

  const mergeTitle = (title: string) => {
    queryClient.setQueryData<AssignData>(['assignData'], (oldData) => {
      return mergeAssignData(oldData, { title });
    });
  };

  const mergeCategory = (item: Category) => {
    queryClient.setQueryData<AssignData>(queryKeys.assignData(), (oldData) => {
      return mergeAssignData(oldData, { category: item });
    });
  };

  const mergeDescription = (description: string) => {
    queryClient.setQueryData<AssignData>(queryKeys.assignData(), (oldData) => {
      return mergeAssignData(oldData, { description });
    });
  };

  const mergePrice = (priceString: string) => {
    queryClient.setQueryData<AssignData>(queryKeys.assignData(), (oldData) => {
      return mergeAssignData(oldData, { price: Number(priceString) });
    });
  };

  const mergeBannerImage = (imageUrl: string) => {
    queryClient.setQueryData<AssignData>(queryKeys.assignData(), (oldData) => {
      return mergeAssignData(oldData, { bannerImageUrl: imageUrl });
    });
  };

  const deleteBannerImage = () => {
    queryClient.setQueryData<AssignData>(queryKeys.assignData(), (oldData) => {
      return mergeAssignData(oldData, { bannerImageUrl: undefined });
    });
  };

  const mergeIntroImage = (imageUrls: string[]) => {
    queryClient.setQueryData<AssignData>(queryKeys.assignData(), (oldData) => {
      return mergeAssignData(oldData, {
        subImageUrls: imageUrls,
      });
    });
  };

  const resetIntroImage = (imageUrls: string[]) => {
    queryClient.setQueryData<AssignData>(queryKeys.assignData(), (oldData) => {
      return mergeAssignData(oldData, { subImageUrls: imageUrls });
    });
  };

  const mergeDate = (date: string) => {
    queryClient.setQueryData(queryKeys.assignDate(), date);
  };

  const mergeStartTime = (time: string) => {
    queryClient.setQueryData(queryKeys.assignStartTime(), time);
  };

  const mergeEndTime = (time: string) => {
    queryClient.setQueryData(queryKeys.assignEndTime(), time);
  };

  const mergeSchedule = (schedule: Schedule) => {
    queryClient.setQueryData<AssignData>(queryKeys.assignData(), (oldData) => {
      return mergeAssignData(oldData, {
        schedules: [...(oldData?.schedules || []), schedule],
      });
    });
  };

  const resetSchedule = (schedules: Schedule[]) => {
    queryClient.setQueryData<AssignData>(queryKeys.assignData(), (oldData) => {
      return mergeAssignData(oldData, { schedules });
    });
  };

  const initialTimes = () => {
    queryClient.setQueryData(queryKeys.assignDate(), '');
    queryClient.setQueryData(queryKeys.assignStartTime(), '');
    queryClient.setQueryData(queryKeys.assignEndTime(), '');
  };

  const initialAssignData = () => {
    queryClient.setQueryData(queryKeys.assignData(), null);
  };

  return {
    mergeAddress,
    mergeTitle,
    mergeCategory,
    mergeDescription,
    mergePrice,
    mergeBannerImage,
    deleteBannerImage,
    mergeIntroImage,
    resetIntroImage,
    mergeDate,
    mergeStartTime,
    mergeEndTime,
    mergeSchedule,
    initialTimes,
    initialAssignData,
    resetSchedule,
  };
};

export default useMergeAssignData;
