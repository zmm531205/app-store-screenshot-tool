import React from 'react';
import { Language, labelsMap } from './labels';

export interface AppData {
  rank: string;
  name: string;
  subtitle: string;
  imageSrc: string;
  openText: string;
}

interface IndonesianAppCardProps {
  app: AppData;
  isLast?: boolean;
  language: 'id';
}

export const IndonesianAppCard: React.FC<IndonesianAppCardProps> = ({ app, isLast = false, language }) => {
  return (
    <>
      <div className="flex items-center py-[11px] bg-white h-[115px]">
        {app.imageSrc ? (
          <div className="ml-[25px] mr-[20px] flex-shrink-0">
            <img
              src={app.imageSrc}
              width={88}
              height={88}
              className="w-[88px] h-[88px] rounded-[22px] object-cover"
              alt={app.name}
              onError={(e) => {
                console.warn(`Failed to load image for ${app.name}:`, app.imageSrc);
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="w-[88px] h-[88px] bg-ios-gray-200 rounded-[22px] hidden"></div>
          </div>
        ) : (
          <div className="w-[88px] h-[88px] bg-ios-gray-200 rounded-[22px] ml-[25px] mr-[20px] flex-shrink-0"></div>
        )}
        <div className="flex items-start gap-[16px] flex-1">
          <span className="font-sans text-[24px] font-medium text-black flex-shrink-0 leading-[27px] mt-0 -ml-1">
            {app.rank}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-sans text-[22px] font-normal text-black leading-[26px] mb-[4px] w-[220px]">
              {app.name}
            </h3>
            <p className="font-sans text-[16px] font-normal text-ios-gray-600 leading-[20px] w-[220px] truncate">
              {app.subtitle}
            </p>
          </div>
        </div>
        <div className="relative h-[50px] mr-[25px] flex items-center justify-center">
          <div className="absolute inset-0 bg-ios-gray-200 border border-gray-300 rounded-[30px]"></div>
          <button className="relative z-10 px-4 h-full flex items-center justify-center">
            <span className={`font-inter font-bold text-ios-blue whitespace-nowrap ${
              app.openText === 'Get' ? 'text-[17px]' : 'text-[19px]'
            }`}>
              {app.openText === 'Get' ? labelsMap[language].buttonText.get : 
               app.openText === 'Open' ? labelsMap[language].buttonText.open : 
               app.openText}
            </span>
          </button>
        </div>
      </div>
      {!isLast && (
        <div className="ml-[126px] mr-[26px] h-px bg-ios-separator"></div>
      )}
    </>
  );
}; 