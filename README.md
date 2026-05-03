# VIPEN ONLINE - 个人博客

基于 Hexo + Butterfly 主题的先锋风格个人博客

## 快速部署到 Vercel（推荐）

### 步骤 1: 创建 GitHub 仓库
1. 登录 [GitHub](https://github.com)
2. 创建一个新仓库，命名为 `vipenonline-blog`
3. 将本项目所有文件上传到仓库

### 步骤 2: 部署到 Vercel
1. 登录 [Vercel](https://vercel.com) 并用 GitHub 登录
2. 点击 "New Project" 导入你的 GitHub 仓库
3. 配置：
   - Framework Preset: **Hexo** (自动识别)
   - Build Command: `npm run build`
   - Output Directory: `public`
4. 点击 "Deploy"

### 步骤 3: 绑定域名
1. 在 Vercel 项目设置中添加你的域名: `www.vipenonline.com`
2. 复制 Vercel 提供的 CNAME 记录值

### 步骤 4: 阿里云域名解析
1. 登录阿里云控制台 → 域名管理
2. 添加解析记录：
   - 记录类型: **CNAME**
   - 主机记录: **www**
   - 记录值: 粘贴 Vercel 提供的地址（如：`cname.vercel-dns.com`）

## 本地开发（需要 Node.js）

如果你想在本地运行：

```bash
# 安装依赖
npm install

# 本地预览
npm run dev  # 访问 http://localhost:4000

# 构建静态文件
npm run build
```

## 自定义修改

- **网站配置**: `_config.yml`
- **主题配置**: `_config.butterfly.yml`（先锋风格深色主题）
- **博客文章**: `source/_posts/`
- **页面**: `source/` 目录下的 `.md` 文件

## 先锋风格特色

- 🎨 深色主题，赛博朋克风格
- ✨ 粒子背景动画
- 🌙 支持暗黑模式
- 📱 响应式设计
- 🚀 快速加载

## 更多资源

- [Hexo 文档](https://hexo.io/zh-cn/docs/)
- [Butterfly 主题文档](https://butterfly.js.org/)

---

**有问题？** 请在 GitHub 上提交 Issue。
