const  UploadImageButton = ({ handleUploadImage }: { handleUploadImage: () => void }) => {
  return (
    <button type="button">
      <div
        className="absolute p-[10px] w-11 h-11 inline-flex items-start bottom-0 right-3 z-10 rounded-full bg-green-80 cursor-pointer"
        onClick={handleUploadImage}
      >
        <img className="w-6 h-6" src="/assets/pen_icon.svg" alt="penIcon" />
      </div>
    </button>
  );
};

export default UploadImageButton;
