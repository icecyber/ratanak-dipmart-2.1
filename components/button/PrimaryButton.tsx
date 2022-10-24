import React from 'react';

interface PrimaryButton {
  text: string;
}

const PrimaryButton = ({ text }: PrimaryButton) => {
  return (
    <div className="bg-blue-900 rounded-xl">
      <h1 className="text-sm font-bold text-white py-4 text-center">{text}</h1>
    </div>
  );
};

export default PrimaryButton;
