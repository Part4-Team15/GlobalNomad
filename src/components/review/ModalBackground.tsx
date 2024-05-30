import React from 'react';

interface ModalBackgroundProps {
  onClose: () => void;
}

const ModalBackground: React.FC<ModalBackgroundProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70" onClick={onClose} />
  );
};

export default ModalBackground;
