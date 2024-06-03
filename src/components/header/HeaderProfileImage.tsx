import React from 'react';
import NoProfileImage from './NoProfileImage';

const HeaderProfileImage = ({
  nickname,
  profileImageUrl,
}: {
  nickname: string;
  profileImageUrl: string;
}) => {
  if (!profileImageUrl) {
    return <NoProfileImage nickname={nickname} />;
  }
  return (
    <div
      className="w-8 h-8 rounded-full overflow-hidden bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${profileImageUrl})`,
        backgroundSize: 'contain',
      }}
    />
  );
};

export default HeaderProfileImage;
