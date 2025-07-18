import Papa from 'papaparse';
import { AppData } from '../components/AppCard';

// 使用提供的 Google Sheet URL，轉換為 CSV 格式
const DEFAULT_SHEET_ID = "1L17GQOKJ2rkjwE3S0IV4LPU3rYxyPf21E591kUt2xFA";

// 從localStorage獲取Sheet ID，如果沒有則使用默認值
const getSheetId = (): string => {
  return localStorage.getItem('googleSheetId') || DEFAULT_SHEET_ID;
};

const getCsvUrl = (sheetId: string): string => {
  return import.meta.env.VITE_SHEET_CSV_URL || `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=0`;
};

// 更新Sheet ID並保存到localStorage
export const updateSheetId = (newSheetId: string): void => {
  localStorage.setItem('googleSheetId', newSheetId);
};

console.log('Default Sheet ID:', DEFAULT_SHEET_ID);
console.log('Environment VITE_SHEET_CSV_URL:', import.meta.env.VITE_SHEET_CSV_URL);

// 默認應用數據，當 CSV 無法加載時使用
const defaultApps: AppData[] = [
  {
    rank: "33",
    name: "Edit 動畫編輯視頻",
    subtitle: "video maker with music",
    imageSrc: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4f/14/e5/4f14e514-1e58-d546-b2a4-7d00e57d085f/Prod-0-0-1x_U007ephone-0-0-0-1-0-0-sRGB-85-220.png/88x0w.png",
    openText: "Get",
  },
];

export const fetchAppsData = async (): Promise<AppData[]> => {
  const sheetId = getSheetId();
  const csvUrl = getCsvUrl(sheetId);
  
  if (!csvUrl) {
    console.warn('VITE_SHEET_CSV_URL not configured, using default data');
    return defaultApps;
  }

  try {
    console.log('Fetching CSV from:', csvUrl);
    console.log('Sheet ID:', sheetId);
    
    const response = await fetch(csvUrl);
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      const errorText = await response.text();
      console.error('Response text:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    console.log('Raw CSV text (first 500 chars):', csvText.substring(0, 500));
    
    // 解析CSV数据
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            console.log('CSV parsing results:', results);
            console.log('CSV headers:', results.meta.fields);
            console.log('First few rows:', results.data.slice(0, 3));
            
            // 檢查所有可能的列名
            const allKeys = new Set<string>();
            results.data.forEach((row: any) => {
              Object.keys(row).forEach(key => allKeys.add(key));
            });
            console.log('All available column keys:', Array.from(allKeys));
            
            // 直接使用您提供的列名順序
            const apps: AppData[] = results.data
              .slice(0, 8) // 只取前8個
              .map((row: any, index: number) => {
                console.log(`Processing row ${index}:`, row);
                
                // 直接使用列名：rank, name, subtitle, imageSrc, opentext
                const rank = row.rank || row['rank'] || String(index + 1);
                const name = row.name || row['name'] || `App ${index + 1}`;
                const subtitle = row.subtitle || row['subtitle'] || 'App description';
                const imageSrc = row.imageSrc || row['imageSrc'] || '';
                const openText = row.opentext || row['opentext'] || row.openText || 'Get';
                
                console.log(`Row ${index} parsed:`, { rank, name, subtitle, imageSrc, openText });
                
                return {
                  rank: String(rank).trim(),
                  name: String(name).trim(),
                  subtitle: String(subtitle).trim(),
                  imageSrc: String(imageSrc).trim(),
                  openText: String(openText).trim(),
                };
              });
            
            console.log('Processed apps:', apps);
            
            // 確保有8個項目
            while (apps.length < 8) {
              apps.push(defaultApps[0]); // 重複使用默認應用
            }
            
            resolve(apps);
          } catch (error) {
            console.error('Error parsing CSV data:', error);
            resolve(defaultApps);
          }
        },
        error: (error) => {
          console.error('Error fetching CSV:', error);
          // 創建8個默認應用
          const fallbackApps = Array(8).fill(null).map(() => defaultApps[0]);
          resolve(fallbackApps);
        },
      });
    });
    
  } catch (error) {
    console.error('Error fetching data:', error);
    // 創建8個默認應用
    const fallbackApps = Array(8).fill(null).map(() => defaultApps[0]);
    return fallbackApps;
  }
}; 