import React from 'react';

interface layout {
  title: string;
}

const TopNavCategory = ({ title }: layout) => {
  return (
    <div className="font-bold text-base py-5 text-center bg-white shadow">
      {title}
    </div>
  );
};

export default TopNavCategory;
