import React from 'react';

const TopNavCategory = (props: any) => {
  return (
    <div className="font-bold text-base py-5 text-center bg-white shadow">
      {props.title}
    </div>
  );
};

export default TopNavCategory;
