const NoProfileImage = ({ nickname }: { nickname: string }) => {
  const nicknameInitial = nickname[0];
  return (
    <div className="w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center text-white">
      {nicknameInitial}
    </div>
  );
};

export default NoProfileImage;
