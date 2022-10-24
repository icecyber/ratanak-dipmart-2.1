import React from 'react';
import ChevronRight from './icons/ChevronRight';

interface SettingComp {
  children: any;
  subSetting?: string;
}

const SettingsComp = ({ children, subSetting }: SettingComp) => {
  return (
    <div className="flex items-center justify-between py-4 ">
      <p className="text-gray-800">{children}</p>
      <div className="flex items-center">
        <p className="pr-6 text-gray-600">{subSetting}</p>
        <ChevronRight />
      </div>
    </div>
  );
};

export default SettingsComp;
