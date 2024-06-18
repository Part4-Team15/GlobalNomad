const DeleteImageButton = ({
  handleDeleteProfileImage,
}: {
  handleDeleteProfileImage: () => void;
}) => {
  return (
    <button type="button" onClick={handleDeleteProfileImage}>
      <img src="/assets/remove_profile_icon.svg" alt="remove_profile_icon" />
    </button>
  );
};

export default DeleteImageButton;
