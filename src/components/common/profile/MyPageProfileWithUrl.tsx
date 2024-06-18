import { MyPageProfileWithUrlProps } from '@/types/myPageProfile';
import { useLocation } from 'react-router-dom';
import UploadImageButton from './UploadImageButton';
import DeleteImageButton from './DeleteImageButton';

const MyPageProfileWithUrl = ({
  uploadedImage,
  profileImageUrl,
  handleFileChange,
  handleUploadImage,
  handleDeleteProfileImage,
}: MyPageProfileWithUrlProps) => {
  const location = useLocation();
  return (
    <div
      className="relative w-40 h-40 shrink-0 rounded-full shadow-md bg-contain bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${uploadedImage || profileImageUrl})`,
        backgroundColor: '#E3E5E8',
      }}
    >
      <input
        id="file-input"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*"
      />

      {location.pathname === '/my/profile' && (
        <UploadImageButton handleUploadImage={handleUploadImage} />
      )}

      {location.pathname === '/my/profile' && (
        <DeleteImageButton handleDeleteProfileImage={handleDeleteProfileImage} />
      )}
    </div>
  );
};

export default MyPageProfileWithUrl;
