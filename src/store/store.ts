import { create } from 'zustand';

interface UploadImageState {
  uploadedImage: string | null;
  setUploadedImage: (imageUrl: string | null) => void;
}

const useUploadImageStore = create<UploadImageState>((set) => ({
  uploadedImage: null,
  setUploadedImage: (imageUrl: string | null) => set({ uploadedImage: imageUrl }),
}));

export default useUploadImageStore;
