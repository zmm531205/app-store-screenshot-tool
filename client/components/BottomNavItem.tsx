import React from 'react';

interface BottomNavItemProps {
  iconSrc: string;
  label: string;
  isActive?: boolean;
  hasNotification?: boolean;
  iconSize?: { width: number; height: number };
}

export const BottomNavItem: React.FC<BottomNavItemProps> = ({
  iconSrc,
  label,
  isActive = false,
  hasNotification = false,
  iconSize = { width: 32, height: 32 },
}) => {
  return (
    <div className="flex-1 flex flex-col items-center py-2">
      <div className="relative mb-1">
        <img
          src={iconSrc}
          alt={label}
          width={iconSize.width}
          height={iconSize.height}
          className="object-contain"
        />
        {hasNotification && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-normal">1</span>
          </div>
        )}
      </div>
      <span
        className={`text-ios-sm font-normal ${isActive ? "text-ios-blue" : "text-ios-gray-700"}`}
      >
        {label}
      </span>
    </div>
  );
}; 