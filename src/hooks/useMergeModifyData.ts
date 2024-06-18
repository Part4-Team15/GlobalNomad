import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/api/reactQuery/queryKeys';
import { ModifyData, Schedule } from '@/types/modifyActivityPage';
import { Category } from '@/types/category';
import { SubImage } from '@/types/activityPage';
import mergeModifyData from '@/components/modifyActivity/utils/mergeModifyData';

const useMergeModifyData = () => {
  const queryClient = useQueryClient();

  const mergeTitle = (title: string) => {
    queryClient.setQueryData<ModifyData>(queryKeys.modifyData(), (oldData) => {
      return mergeModifyData(oldData, { title });
    });
  };

  const mergeCategory = (category: Category | string) => {
    queryClient.setQueryData<ModifyData>(queryKeys.modifyData(), (oldData) => {
      return mergeModifyData(oldData, { category });
    });
  };

  const mergeDescription = (description: string) => {
    queryClient.setQueryData<ModifyData>(queryKeys.modifyData(), (oldData) => {
      return mergeModifyData(oldData, { description });
    });
  };

  const mergePriceNum = (price: number) => {
    queryClient.setQueryData<ModifyData>(queryKeys.modifyData(), (oldData) => {
      return mergeModifyData(oldData, { price });
    });
  };

  const mergePriceStr = (newPrice: string) => {
    queryClient.setQueryData<ModifyData>(queryKeys.modifyData(), (oldData) => {
      return mergeModifyData(oldData, { price: newPrice === '' ? 0 : Number(newPrice) });
    });
  };

  const mergeAddress = (address: string) => {
    queryClient.setQueryData<ModifyData>(queryKeys.modifyData(), (oldData) => {
      return mergeModifyData(oldData, { address });
    });
  };

  const mergeBannerImage = (bannerImageUrl: string) => {
    queryClient.setQueryData<ModifyData>(queryKeys.modifyData(), (oldData) => {
      return mergeModifyData(oldData, { bannerImageUrl });
    });
  };

  const deleteBannerImage = () => {
    queryClient.setQueryData<ModifyData>(queryKeys.modifyData(), (oldData) => {
      return mergeModifyData(oldData, { bannerImageUrl: undefined });
    });
  };

  const mergeIntroImage = (imageUrl: string) => {
    queryClient.setQueryData<ModifyData>(queryKeys.modifyData(), (oldData) => {
      const updatedData = mergeModifyData(oldData, {
        subImageUrlsToAdd: [...(oldData?.subImageUrlsToAdd || []), imageUrl],
      });
      return updatedData;
    });
  };

  const deleteIntroImageId = (removeIntroImage: SubImage) => {
    queryClient.setQueryData<ModifyData>(queryKeys.modifyData(), (oldData) => {
      return mergeModifyData(oldData, {
        subImageIdsToRemove: [
          ...(oldData?.subImageIdsToRemove || []),
          removeIntroImage.id as number,
        ],
      });
    });
  };

  const deleteIntroImageUrl = (removeIntroImage: SubImage) => {
    queryClient.setQueryData<ModifyData>(queryKeys.modifyData(), (oldData) => {
      const updatedSubImage = oldData?.subImageUrlsToAdd?.filter(
        (imageUrl) => imageUrl !== removeIntroImage.imageUrl,
      );

      return mergeModifyData(oldData, {
        subImageUrlsToAdd: updatedSubImage,
      });
    });
  };

  const mergeDate = (date: string) => {
    queryClient.setQueryData(queryKeys.modifyScheduleDate(), date);
  };

  const mergeStartTime = (startTime: string) => {
    queryClient.setQueryData(queryKeys.modifyScheduleStartTime(), startTime);
  };

  const mergeEndTime = (endTime: string) => {
    queryClient.setQueryData(queryKeys.modifyScheduleEndTime(), endTime);
  };

  const mergeSchedule = (schedules: Schedule[]) => {
    queryClient.setQueryData(queryKeys.modifySchedule(), { schedules });
  };

  const mergeAddSchedule = (newReservationTime: Schedule) => {
    queryClient.setQueryData<{ schedules: Schedule[] }>(queryKeys.modifySchedule(), (oldData) => {
      const updatedSchedules = [...(oldData?.schedules || []), newReservationTime];
      return { schedules: updatedSchedules };
    });
  };

  const mergeModifySchedule = (newReservationTime: Schedule) => {
    queryClient.setQueryData<ModifyData>(queryKeys.modifyData(), (oldData) => {
      return mergeModifyData(oldData, {
        schedulesToAdd: [...(oldData?.schedulesToAdd || []), newReservationTime],
      });
    });
  };

  const deleteScheduleId = (removedSchedule: Schedule) => {
    queryClient.setQueryData<ModifyData>(queryKeys.modifyData(), (oldData) => {
      return mergeModifyData(oldData, {
        scheduleIdsToRemove: [
          ...(oldData?.scheduleIdsToRemove || []),
          removedSchedule.id as number,
        ],
      });
    });
  };

  const deleteScheduleAdd = (removedSchedule: Schedule) => {
    queryClient.setQueryData<ModifyData>(queryKeys.modifyData(), (oldData) => {
      const updatedSchedulesToAdd = oldData?.schedulesToAdd?.filter(
        (schedule) =>
          schedule.date !== removedSchedule.date ||
          schedule.startTime !== removedSchedule.startTime ||
          schedule.endTime !== removedSchedule.endTime,
      );
      return mergeModifyData(oldData, {
        schedulesToAdd: updatedSchedulesToAdd,
      });
    });
  };

  const initialTimes = () => {
    queryClient.setQueryData(queryKeys.modifyScheduleDate(), '');
    queryClient.setQueryData(queryKeys.modifyScheduleStartTime(), '');
    queryClient.setQueryData(queryKeys.modifyScheduleEndTime(), '');
  };

  return {
    mergeTitle,
    mergeCategory,
    mergeDescription,
    mergePriceNum,
    mergePriceStr,
    mergeAddress,
    mergeBannerImage,
    deleteBannerImage,
    mergeIntroImage,
    deleteIntroImageId,
    deleteIntroImageUrl,
    mergeDate,
    mergeStartTime,
    mergeEndTime,
    mergeSchedule,
    mergeAddSchedule,
    mergeModifySchedule,
    deleteScheduleId,
    deleteScheduleAdd,
    initialTimes,
  };
};

export default useMergeModifyData;
