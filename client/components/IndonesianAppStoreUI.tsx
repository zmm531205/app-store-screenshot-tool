import React from 'react';
import { ChevronLeft } from "lucide-react";
import { AppData } from "./AppCard";
import { IndonesianAppCard } from "./IndonesianAppCard";
import { BottomNavItem } from "./BottomNavItem";
import { Labels } from "./labels";

interface IndonesianAppStoreUIProps {
  apps: AppData[];
  labels: Labels;
  language: 'id';
  chartType: 'overall' | 'category';
  containerRef: React.RefObject<HTMLDivElement>;
}

export const IndonesianAppStoreUI: React.FC<IndonesianAppStoreUIProps> = ({
  apps,
  labels,
  language,
  chartType,
  containerRef
}) => {
  return (
    <div className="w-[560px] h-[1156px] bg-ios-gray-100 relative overflow-hidden mx-auto" ref={containerRef}>
      {/* Top Charts Section with Gray Background - 印尼定制版 */}
      <div
        className="w-full h-[180px]"
        style={{ backgroundColor: "#F7F7F7" }}
      >
        {/* Header Navigation - 印尼定制版 */}
        <div className="px-4 py-4">
          {/* 第一行：返回按钮和All Apps */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <ChevronLeft size={28} className="text-ios-blue mr-2" />
              <span className="font-inter text-[20px] font-medium text-ios-blue">
                {labels.appTitle}
              </span>
            </div>
            <span className="font-sans text-[19px] font-normal text-ios-blue truncate">
              {chartType === 'overall' ? labels.allApps : labels.categoryApps}
            </span>
          </div>
          
          {/* 第二行：Top Charts 单独置左 */}
          <div className="flex items-center mb-2">
            <span className="font-sans text-[44px] font-bold text-black">
              {labels.topCharts}
            </span>
          </div>
        </div>

        {/* Tab Section - 印尼定制版 */}
        <div className="px-4 py-2 -mt-[24px]">
          <div className="flex gap-0">
            <button className="flex-1 h-auto self-stretch px-6 py-2 bg-white border-2 border-ios-gray-200 rounded-tl-lg rounded-bl-lg rounded-tr-none rounded-br-none">
              <span className="font-sans text-[16px] font-medium text-black">
                {labels.freeApps}
              </span>
            </button>
            <button className="flex-1 py-2 px-6 bg-ios-gray-200 rounded-tr-lg rounded-br-lg rounded-tl-none rounded-bl-none">
              <span className="font-sans text-[16px] font-normal text-black">
                {labels.paidApps}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* App List - 印尼定制版 */}
      <div className="bg-white">
        {apps.map((app, index) => (
          <IndonesianAppCard
            key={index}
            app={app}
            isLast={index === apps.length - 1}
            language={language}
          />
        ))}
      </div>

      {/* Bottom Navigation - 印尼定制版 */}
      <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <div className="flex">
          <BottomNavItem
            iconSrc="/img/today.png"
            label={labels.bottomNav.today}
            iconSize={{ width: 26, height: 31 }}
          />
          <BottomNavItem
            iconSrc="/img/games.png"
            label={labels.bottomNav.games}
            iconSize={{ width: 31, height: 31 }}
          />
          <BottomNavItem
            iconSrc="/img/apps.png"
            label={labels.bottomNav.apps}
            isActive={true}
            iconSize={{ width: 33, height: 31 }}
          />
          <BottomNavItem
            iconSrc="/img/arcade.png"
            label={labels.bottomNav.arcade}
            hasNotification={true}
            iconSize={{ width: 38, height: 33 }}
          />
          <BottomNavItem
            iconSrc="/img/search.png"
            label={labels.bottomNav.search}
            iconSize={{ width: 31, height: 31 }}
          />
        </div>
        {/* Home Indicator - 印尼定制版 */}
        <div className="flex justify-center py-2">
          <div className="w-[120px] h-[4px] bg-black rounded-full"></div>
        </div>
      </div>

      {/* Spacer for bottom nav */}
      <div className="h-24"></div>
    </div>
  );
}; 