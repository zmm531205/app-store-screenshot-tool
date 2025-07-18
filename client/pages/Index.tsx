import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import { AppCard, AppData } from "../components/AppCard";
import { BottomNavItem } from "../components/BottomNavItem";
import { labelsMap, Language } from "../components/labels";
import { IndonesianAppStoreUI } from "../components/IndonesianAppStoreUI";
import { fetchAppsData, updateSheetId, updateGid, AppsDataResult } from "../services/dataService";
import { takeScreenshot, preloadImages } from "../services/screenshotService";

export default function Index() {
  const [language, setLanguage] = useState<Language>('en');
  const [apps, setApps] = useState<AppData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScreenshotLoading, setIsScreenshotLoading] = useState(false);
  const [sheetId, setSheetId] = useState<string>(localStorage.getItem('googleSheetId') || '1L17GQOKJ2rkjwE3S0IV4LPU3rYxyPf21E591kUt2xFA');
  const [gid, setGid] = useState<string>(localStorage.getItem('googleSheetGid') || '0');
  const [chartType, setChartType] = useState<'overall' | 'category'>(
    (localStorage.getItem('chartType') as 'overall' | 'category') || 'overall'
  );
  const [autoDetectedChartType, setAutoDetectedChartType] = useState<'overall' | 'category'>('overall');
  const [useAutoDetection, setUseAutoDetection] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const labels = labelsMap[language];

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const result: AppsDataResult = await fetchAppsData();
        setApps(result.apps);
        setAutoDetectedChartType(result.chartType);
        if (useAutoDetection) {
          setChartType(result.chartType);
        }
        
        // 預加載圖片以改善截圖質量
        const imageUrls = result.apps.map(app => app.imageSrc).filter(Boolean);
        await preloadImages(imageUrls);
      } catch (error) {
        console.error('Failed to load apps data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as Language);
  };

  const handleChartTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newChartType = event.target.value as 'overall' | 'category';
    setChartType(newChartType);
    localStorage.setItem('chartType', newChartType);
  };

  const handleSheetIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSheetId = event.target.value.trim();
    setSheetId(newSheetId);
    updateSheetId(newSheetId);
  };

  const handleGidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newGid = event.target.value.trim();
    setGid(newGid);
    updateGid(newGid);
  };

  const handleAutoDetectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const useAuto = event.target.checked;
    setUseAutoDetection(useAuto);
    if (useAuto) {
      setChartType(autoDetectedChartType);
    }
  };

  const handleRefreshData = async () => {
    setIsLoading(true);
    try {
      const result: AppsDataResult = await fetchAppsData();
      setApps(result.apps);
      setAutoDetectedChartType(result.chartType);
      if (useAutoDetection) {
        setChartType(result.chartType);
      }
      
      // 預加載圖片以改善截圖質量
      const imageUrls = result.apps.map(app => app.imageSrc).filter(Boolean);
      await preloadImages(imageUrls);
    } catch (error) {
      console.error('Failed to load apps data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScreenshot = async () => {
    if (!containerRef.current) return;
    
    setIsScreenshotLoading(true);
    try {
      await takeScreenshot(containerRef.current);
    } finally {
      setIsScreenshotLoading(false);
    }
  };

  const handleOpenSheet = () => {
    if (sheetId) {
      const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}`;
      window.open(sheetUrl, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="w-[560px] h-[1156px] bg-ios-gray-100 flex items-center justify-center mx-auto">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ios-blue mx-auto mb-4"></div>
          <p className="text-ios-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-black-100 py-8">
      {/* 悬浮产品导航栏 */}
      <div className="w-[560px] bg-white/60 backdrop-blur-sm border border-white/20 rounded-[20px] p-4 mb-4 shadow-lg relative overflow-hidden">
        {/* 杂讯质感背景 */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}></div>
        </div>
                {/* 内容 */}
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            {/* 左侧标题 */}
            <div className="flex items-center">
              <h1 className="text-[28px] font-bold text-gray-800">截個美圖</h1>
            </div>
            
            {/* 右侧信息 */}
            <div className="flex flex-col items-end space-y-0.5">
              <span className="text-[10px] font-bold text-gray-600">Powered by Jamie</span>
              <span className="text-[10px] font-bold text-gray-600">Inspired by Yan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel - 完全獨立的控制區域 */}
      <div className="control-panel w-[560px] bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
        <div className="space-y-4">
          {/* 第1行：Google Sheet ID 輸入 */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sheet ID:</label>
              <input
                type="text"
                value={sheetId}
                onChange={handleSheetIdChange}
                placeholder="輸入 Google Sheet ID"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-20">
              <label className="block text-sm font-medium text-gray-700 mb-1">GID:</label>
              <input
                type="text"
                value={gid}
                onChange={handleGidChange}
                placeholder="0"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleOpenSheet}
                disabled={!sheetId}
                className="px-4 py-2 bg-gray-300 text-black text-sm rounded hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                ↗︎
              </button>
              <button
                onClick={handleRefreshData}
                disabled={isLoading}
                className="px-4 py-2 bg-gray-300 text-black text-sm rounded hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                {isLoading ? 'Loading...' : 'Reload'}
              </button>
            </div>
          </div>
          {/* 第2行：榜單類型和語言選擇 */}
          <div className="space-y-3">
            {/* 第一行：Chart Type 和 Auto-Detect */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Chart Type:</label>
                <select
                  value={chartType}
                  onChange={handleChartTypeChange}
                  disabled={useAutoDetection}
                  className="px-3 py-1 text-sm border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="overall">總榜</option>
                  <option value="category">分類榜</option>
                </select>
                {useAutoDetection && (
                  <span className="text-xs text-gray-500">
                    (自動檢測: {autoDetectedChartType === 'overall' ? '總榜' : '分類榜'})
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={useAutoDetection}
                    onChange={handleAutoDetectionChange}
                    className="w-3 h-3"
                  />
                  自動檢測
                </label>
              </div>
            </div>
            
            {/* 第二行：Language 和 Screenshot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Language:</label>
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className="px-3 py-1 text-sm border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="en">English</option>
                  <option value="zh-tw">繁體中文</option>
                  <option value="th">Thai</option>
                  <option value="id">Indonesian</option>
                  <option value="vn">Vietnamese</option>
                </select>
              </div>
              <button
                onClick={handleScreenshot}
                disabled={isScreenshotLoading}
                className="px-4 py-2 bg-gray-300 text-black text-sm rounded hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                {isScreenshotLoading ? 'Generating...' : labels.exportScreenshot}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* App Store UI - 根据语言选择不同版本 */}
      {language === 'id' ? (
        <IndonesianAppStoreUI
          apps={apps}
          labels={labels}
          language={language}
          chartType={chartType}
          containerRef={containerRef}
        />
      ) : (
        <div className="w-[560px] h-[1156px] bg-ios-gray-100 relative overflow-hidden mx-auto" ref={containerRef}>
          {/* Top Charts Section with Gray Background */}
          <div
            className="w-full h-[140px]"
            style={{ backgroundColor: "#F7F7F7" }}
          >
            {/* Header Navigation */}
            <div className="flex items-center px-4 py-4 relative">
              <div className="flex items-center absolute left-4">
                <ChevronLeft size={28} className="text-ios-blue mr-2" />
                <span className="font-inter text-[21px] font-bold text-ios-blue">
                  {labels.appTitle}
                </span>
              </div>
              <span className="font-sans text-[22px] font-medium text-black text-center flex-1">
                {labels.topCharts}
              </span>
              <span className="font-sans text-[21px] font-normal text-ios-blue absolute right-4">
                {chartType === 'overall' ? labels.allApps : labels.categoryApps}
              </span>
            </div>

            {/* Tab Section */}
            <div className="px-4 py-4 -mt-1">
              <div className="flex gap-0">
                <button className="flex-1 h-auto self-stretch px-6 py-3 bg-white border-2 border-ios-gray-200 rounded-tl-lg rounded-bl-lg rounded-tr-none rounded-br-none">
                  <span className="font-sans text-[17px] font-medium text-black">
                    {labels.freeApps}
                  </span>
                </button>
                <button className="flex-1 py-3 px-6 bg-ios-gray-200 rounded-tr-lg rounded-br-lg rounded-tl-none rounded-bl-none">
                  <span className="font-sans text-[17px] font-normal text-black">
                    {labels.paidApps}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* App List */}
          <div className="bg-white">
            {apps.map((app, index) => (
              <AppCard
                key={index}
                app={app}
                isLast={index === apps.length - 1}
                language={language}
              />
            ))}
          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200">
            <div className="flex">
              <BottomNavItem
                iconSrc="/img/today.png"
                label={labels.bottomNav.today}
                iconSize={{ width: 28, height: 33 }}
              />
              <BottomNavItem
                iconSrc="/img/games.png"
                label={labels.bottomNav.games}
                iconSize={{ width: 33, height: 33 }}
              />
              <BottomNavItem
                iconSrc="/img/apps.png"
                label={labels.bottomNav.apps}
                isActive={true}
                iconSize={{ width: 35, height: 33 }}
              />
              <BottomNavItem
                iconSrc="/img/arcade.png"
                label={labels.bottomNav.arcade}
                hasNotification={true}
                iconSize={{ width: 40, height: 35 }}
              />
              <BottomNavItem
                iconSrc="/img/search.png"
                label={labels.bottomNav.search}
                iconSize={{ width: 33, height: 33 }}
              />
            </div>
            {/* Home Indicator */}
            <div className="flex justify-center py-2">
              <div className="w-[134px] h-[5px] bg-black rounded-full"></div>
            </div>
          </div>

          {/* Spacer for bottom nav */}
          <div className="h-24"></div>
        </div>
      )}
    </div>
  );
}
