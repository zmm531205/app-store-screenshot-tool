export const takeScreenshot = async (elementRef: HTMLElement | null): Promise<void> => {
  if (!elementRef) {
    console.error('Element reference is null');
    return;
  }

  try {
    // 顯示加載狀態
    const loadingElement = document.createElement('div');
    loadingElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 20px;
      border-radius: 8px;
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    `;
    loadingElement.textContent = '正在生成截圖...';
    document.body.appendChild(loadingElement);

    // 確保元素完全渲染
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 使用 dom-to-image
    const domtoimage = (await import('dom-to-image')).default;
    
    // 保存原始樣式
    const originalStyle = elementRef.style.cssText;
    const originalMaxWidth = elementRef.style.maxWidth;
    const originalMargin = elementRef.style.margin;
    const originalWidth = elementRef.style.width;
    
    // 臨時修改樣式以避免裁切問題，但保持固定寬度
    elementRef.style.maxWidth = 'none';
    elementRef.style.margin = '0';
    elementRef.style.width = '560px'; // 保持固定寬度
    
    // 確保所有子元素的樣式保持一致
    const nameElementsBefore = elementRef.querySelectorAll('h3');
    nameElementsBefore.forEach(el => {
      (el as HTMLElement).style.width = '214px';
    });
    
    // 根據 August 的經驗，第一次截圖可能會空白，所以執行兩次
    const config = {
      quality: 1.0,
      bgcolor: '#F7F7F7',
      width: 560 * 2, // 固定 560px 寬度的 2 倍
      height: elementRef.offsetHeight * 2,
      style: {
        transform: 'scale(2)',
        transformOrigin: 'top left'
      }
    };
    
    // 第一次截圖（可能會空白）
    let dataUriTemp: string;
    try {
      dataUriTemp = await domtoimage.toPng(elementRef, config);
    } catch (error) {
      console.warn('First screenshot attempt failed:', error);
    }
    
    // 等待一下再執行第二次
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 第二次截圖（應該正常）
    const dataUrl = await domtoimage.toPng(elementRef, config);
    
    // 恢復原始樣式
    elementRef.style.cssText = originalStyle;
    elementRef.style.maxWidth = originalMaxWidth;
    elementRef.style.margin = originalMargin;
    elementRef.style.width = originalWidth;
    
    // 恢復name元素的原始樣式
    const nameElementsAfter = elementRef.querySelectorAll('h3');
    nameElementsAfter.forEach(el => {
      (el as HTMLElement).style.width = '';
    });

    // 移除加載狀態
    document.body.removeChild(loadingElement);

    // 下載圖片
    const link = document.createElement('a');
    link.download = `apple_us_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error('Screenshot error:', error);
    const loadingElement = document.querySelector('[data-loading="screenshot"]');
    if (loadingElement) {
      document.body.removeChild(loadingElement);
    }
  }
};

// 處理跨域圖片的輔助函數
export const preloadImages = async (imageUrls: string[]): Promise<void> => {
  const promises = imageUrls
    .filter(url => url && url.startsWith('http'))
    .map(url => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve();
        img.onerror = () => {
          console.warn(`Failed to preload image: ${url}`);
          resolve(); // 不阻擋其他圖片
        };
        img.src = url;
      });
    });

  await Promise.all(promises);
}; 