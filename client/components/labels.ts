export type Language = 'en' | 'zh-tw' | 'th' | 'id' | 'vn';

export interface Labels {
  appTitle: string;
  topCharts: string;
  allApps: string;
  categoryApps: string;
  freeApps: string;
  paidApps: string;
  exportScreenshot: string;
  toggleOptions: {
    overall: string;
    category: string;
  };
  buttonText: {
    get: string;
    open: string;
  };
  bottomNav: {
    today: string;
    games: string;
    apps: string;
    arcade: string;
    search: string;
  };
}

export const labelsMap: Record<Language, Labels> = {
  en: {
    appTitle: "Apps",
    topCharts: "Top Charts",
    allApps: "All Apps",
    categoryApps: "Photo & Video",
    freeApps: "Free Apps",
    paidApps: "Paid Apps",
    exportScreenshot: "Screenshot",
    toggleOptions: {
      overall: "Overall",
      category: "Category",
    },
    buttonText: {
      get: "Get",
      open: "Open",
    },
    bottomNav: {
      today: "Today",
      games: "Games",
      apps: "Apps",
      arcade: "Arcade",
      search: "Search",
    },
  },
  'zh-tw': {
    appTitle: "App",
    topCharts: "排行榜",
    allApps: "所有 App",
    categoryApps: "照片和影片",
    freeApps: "免費 App",
    paidApps: "付費 App",
    exportScreenshot: "匯出截圖",
    toggleOptions: {
      overall: "總榜",
      category: "分類榜",
    },
    buttonText: {
      get: "取得",
      open: "打開",
    },
    bottomNav: {
      today: "Today",
      games: "遊戲",
      apps: "App",
      arcade: "Arcade",
      search: "搜尋",
    },
  },
  'th': {
    appTitle: "ย้อนกลับ",
    topCharts: "อันดับยอดนิยม",
    allApps: "แอปทั้งหมด",
    categoryApps: "รูปและวีดีโอ",
    freeApps: "แอปฟรี",
    paidApps: "แอปที่มีค่าใช้จ่าย",
    exportScreenshot: "Screenshot",
    toggleOptions: {
      overall: "รวม",
      category: "หมวดหมู่",
    },
    buttonText: {
      get: "รับ",
      open: "เปิด",
    },
    bottomNav: {
      today: "วันนี้",
      games: "เกม",
      apps: "แอป",
      arcade: "Arcade",
      search: "ค้นหา",
    },
  },
  'id': {
    appTitle: "Kembali",
    topCharts: "Peringkat Teratas",
    allApps: "Semua App",
    categoryApps: "Foto & Video",
    freeApps: "App Gratis",
    paidApps: "App Berbayar",
    exportScreenshot: "Screenshot",
    toggleOptions: {
      overall: "Keseluruhan",
      category: "Kategori",
    },
    buttonText: {
      get: "DAPATKAN",
      open: "BUKA",
    },
    bottomNav: {
      today: "Hari Ini",
      games: "Game",
      apps: "App",
      arcade: "Arcade",
      search: "Cari",
    },
  },
  'vn': {
    appTitle: "Ứng dụng",
    topCharts: "Bảng xếp hạng",
    allApps: "Tất cả các app",
    categoryApps: "Danh mục",
    freeApps: "App Miễn Phí",
    paidApps: "App Trả Phí",
    exportScreenshot: "Screenshot",
    toggleOptions: {
      overall: "Tổng thể",
      category: "Danh mục",
    },
    buttonText: {
      get: "Nhận",
      open: "Mở",
    },
    bottomNav: {
      today: "Hôm nay",
      games: "Trò chơi",
      apps: "Ứng dụng",
      arcade: "Arcade",
      search: "Tìm kiếm",
    },
  },
}; 