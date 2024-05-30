const InformationNoImage = ({ nickname }: { nickname: string }) => {
  const nicknameInitial = nickname[0];
  return (
    <div className="w-40 h-40 bg-slate-400 rounded-full flex items-center justify-center text-white">
      {nicknameInitial}
      <div className="absolute p-[10px] w-11 h-11 inline-flex items-start bottom-0 right-3 z-10 rounded-full bg-green-80">
        <img className="w-6 h-6" src="/assets/pen_icon.svg" alt="penIcon" />
      </div>
    </div>
  );
};

export default InformationNoImage;
