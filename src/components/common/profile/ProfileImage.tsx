import React from 'react';
import InformationNoImage from './InformationNoProfileImage';

const ProfileImage = ({
  nickname,
  profileImageUrl,
}: {
  nickname: string;
  profileImageUrl: string;
}) => {
  if (!profileImageUrl) {
    return <InformationNoImage nickname={nickname} />;
  }
  return (
    <div
      className="relative w-40 h-40 shrink-0 rounded-full shadow-md bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${profileImageUrl})`,
        backgroundColor: '#E3E5E8',
      }}
    >
      <div className="absolute p-[10px] w-11 h-11 inline-flex items-start bottom-0 right-3 z-10 rounded-full bg-green-80">
        <img className="w-6 h-6" src="/assets/pen_icon.svg" alt="penIcon" />
      </div>
    </div>
  );
};

export default ProfileImage;
