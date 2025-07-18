# App Store Screenshot Tool

一個基於 React + Vite 的純前端截圖工具，支持從 Google Sheet 動態拉取應用數據，多語言切換，以及一鍵生成高分辨率截圖。

## 功能特色

- 📊 **數據驅動**: 從 Google Sheet CSV 動態拉取應用數據
- 🌍 **多語言支持**: 英文 (en) 與繁體中文 (zh-tw) 切換
- 🎨 **UI 一致性**: 復用現有 Tailwind CSS 主題與樣式
- 📸 **截圖導出**: 利用 html2canvas 一鍵生成高分辨率 PNG
- 🚀 **靜態部署**: 支持免費靜態部署方案

## 技術棧

- **框架**: React 18 + Vite
- **樣式**: Tailwind CSS v3
- **數據解析**: Papaparse
- **國際化**: 本地 labelsMap + React State 切換
- **截圖**: html2canvas
- **語言**: TypeScript

## 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 配置環境變數

創建 `.env` 文件：

```env
# Google Sheet CSV URL (公開分享的 CSV 連結)
# 格式: https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid=0
VITE_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=0
```

### 3. 運行開發服務器

```bash
npm run dev
```

### 4. 構建生產版本

```bash
npm run build
```

## Google Sheet 數據格式

你的 Google Sheet 應該包含以下列：

| rank | name | subtitle | imageSrc | openText |
|------|------|----------|----------|----------|
| 1 | CapCut - 動画 | Video maker with music | https://... | Get |
| 2 | TikTok | Videos, Music & LIVE | https://... | Get |

### 設置 Google Sheet

1. 創建一個 Google Sheet
2. 添加上述列標題
3. 填入應用數據
4. 分享設置為「任何人都可以查看」
5. 複製 CSV 導出連結

## 部署

### Vercel (推薦)

1. 將代碼推送到 GitHub
2. 在 Vercel 中導入項目
3. 設置環境變數 `VITE_SHEET_CSV_URL`
4. 部署完成

### Netlify

1. 將代碼推送到 GitHub
2. 在 Netlify 中導入項目
3. 設置環境變數
4. 部署完成

### Cloud Run

```bash
# 構建 Docker 鏡像
docker build -t app-store-screenshot .

# 推送到 Google Container Registry
docker tag app-store-screenshot gcr.io/YOUR_PROJECT/app-store-screenshot
docker push gcr.io/YOUR_PROJECT/app-store-screenshot

# 部署到 Cloud Run
gcloud run deploy app-store-screenshot \
  --image gcr.io/YOUR_PROJECT/app-store-screenshot \
  --platform managed \
  --region asia-east1 \
  --allow-unauthenticated
```

## 項目結構

```
app-store-ui-main/
├─ client/
│  ├─ components/
│  │  ├─ AppCard.tsx          # 應用卡片組件
│  │  ├─ BottomNavItem.tsx    # 底部導航組件
│  │  ├─ labels.ts            # 多語言標籤
│  │  └─ ui/                  # UI 組件庫
│  ├─ services/
│  │  ├─ dataService.ts       # 數據服務
│  │  └─ screenshotService.ts # 截圖服務
│  ├─ pages/
│  │  └─ Index.tsx            # 主頁面
│  └─ ...
├─ public/
│  └─ img/                    # 底部導航圖標
└─ ...
```

## 使用場景

- **市場/產品團隊**: 在 Google Sheet 中維護 top 8 應用列表，更新後可在前端頁面實時渲染
- **多語言展示**: 用戶可切換語言查看英文或其他語言界面
- **截圖匯報**: 點擊「匯出截圖」按鈕，即可下載當前渲染頁面的完整圖片

## 注意事項

- **跨域圖片**: 第三方 WebP 連結需做 Blob 處理，否則 html2canvas 會污染
- **CI 環境變數**: 確保 `VITE_SHEET_CSV_URL` 正確設置在部署環境
- **構建體積**: Tailwind 較大，需在 content 中精確指定源文件路徑
- **部署頻次**: Sheet 數據變動時無需每次重新部署，前端直接拉取最新 CSV

## 後續擴展

1. **Google/Apple 切換**: 實現兩種前端頁面切換
2. **更多語言支持**: 添加日文、韓文等
3. **自定義主題**: 支持深色模式
4. **批量截圖**: 支持一次生成多個語言的截圖

## 開發

```bash
# 類型檢查
npm run typecheck

# 格式化代碼
npm run format.fix

# 運行測試
npm test
```

## 授權

MIT License 