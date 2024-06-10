const HeaderProfileImage = ({ profileImageUrl }: { profileImageUrl: string }) => (
  <div
    className="w-8 h-8 rounded-full overflow-hidden bg-no-repeat bg-contain bg-center"
    style={{
      backgroundImage: `url(${profileImageUrl})`,
    }}
  />
);

export default HeaderProfileImage;
