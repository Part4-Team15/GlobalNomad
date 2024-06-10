import styled, { keyframes } from 'styled-components';

const shakeAnimation = keyframes`
  0%, 100% { transform: translateX(-50%); }
  5%, 15%, 25%, 35%, 45%, 55%, 65%, 75%, 85%, 95% { transform: translateX(calc(-50% - 3px)); }
  10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90% { transform: translateX(calc(-50% + 3px)); }
`;

const ReviewWarningPopupContent = styled.div<{ isVisible: boolean }>`
  animation: ${({ isVisible }) => (isVisible ? shakeAnimation : 'none')} 0.8s ease-in-out forwards;
`;

export default ReviewWarningPopupContent;
