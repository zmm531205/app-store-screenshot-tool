# Netlify 部署指南

## 快速部署步骤

### 1. 准备代码
确保代码已提交到 GitHub 仓库。

### 2. 连接 Netlify
1. 访问 [netlify.com](https://netlify.com)
2. 点击 "Sign up" 使用 GitHub 账号登录
3. 点击 "New site from Git"
4. 选择 GitHub 仓库
5. 配置部署设置：
   - **Build command**: `npm run build:client`
   - **Publish directory**: `dist/spa`
   - **Node version**: 18

### 3. 环境变量（可选）
如果需要，可以在 Netlify 设置中添加环境变量：
- `GOOGLE_SHEET_ID`: 默认的 Google Sheet ID

### 4. 自定义域名（可选）
在 Netlify 设置中可以绑定自定义域名。

## 部署配置

项目已包含 `netlify.toml` 配置文件，包含：
- 构建命令和发布目录
- SPA 路由重定向
- 安全头设置

## 自动部署

连接 GitHub 后，每次推送代码到主分支都会自动触发部署。

## 本地测试

```bash
# 构建项目
npm run build:client

# 本地预览构建结果
npx serve dist/spa
```

## 注意事项

1. **Google Sheet 权限**: 确保 Google Sheet 设置为"任何人都可以查看"
2. **CORS**: Netlify 支持跨域请求，可以正常访问 Google Sheet API
3. **图片资源**: 构建时会自动复制 `img/` 目录下的图片文件 