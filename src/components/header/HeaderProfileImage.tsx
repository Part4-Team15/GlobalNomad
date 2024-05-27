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
  return <img src={profileImageUrl} alt="Profile" />;
};

export default HeaderProfileImage;
