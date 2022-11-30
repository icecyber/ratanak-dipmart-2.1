import React from 'react';

interface Props {}

const Successfill: React.FC<Props> = (props: Props) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="10"
        cy="10"
        r="9.25"
        fill="#2B2F7E"
        stroke="#2B2F7E"
        strokeWidth="1.5"
      />
      <path
        d="M6.66663 9.96643L9.01457 12.3144L13.7098 7.61914"
        stroke="#F2F2F2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Successfill;
