> 这是一个运行在 Cloudflare Workers 上的博客程序，使用 Cloudflare KV 作为数据库，无其他依赖。
> 兼容静态博客的速度，以及动态博客的灵活性，方便搭建不折腾，很稳定。

### 讨论群: [@cf-workers-blog](https://discord.gg/mKCvScsW5e)

# 主要特点
* 使用 Workers 提供的 KV 作为数据库
* 使用 Cloudflare 缓存 HTML 来降低 KV 的读写
* 所有 HTML 页面均为缓存，可达到静态博客的速度
* 使用 KV 作为数据库，可达到 WordPress 的灵活性
* 后台使用 Markdown 语法，方便快捷
* 一键发布（页面重构 + 缓存清理）

# 承载能力
* KV 基本不存在瓶颈，因为使用了缓存，读写很少
* 唯一瓶颈是 Workers 的日访问量 10w，大约能承受2万IP /日
* 文章数：1G 存储空间，几万篇问题不大

# 部署步骤
1. Fork 本仓库
2. 在 Cloudflare Dashboard 创建两个 KV Namespace
3. 创建一个 Worker，将 `index.js` 的内容粘贴进去
4. 在 Worker 设置中绑定 KV Namespace：
   - 变量名 `CFBLOG`（用于文章数据）
   - 变量名 `CFCOMMENT`（用于评论数据）
5. 修改 `index.js` 头部的 `OPT` 配置项（站点名、域名、密码等）
6. 绑定自定义域名或使用 Workers 自带域名
7. 访问 `https://你的域名/admin/` 进入后台

# OPT 配置说明

| 配置项 | 说明 |
|--------|------|
| `user` / `password` | 后台登录账号密码 |
| `siteDomain` | 站点域名 |
| `siteName` | 站点名称 |
| `siteDescription` | 站点描述 |
| `keyWords` | SEO 关键词 |
| `pageSize` | 每页文章数 |
| `themeURL` | 主题文件远程路径 |
| `faviconURL` | 博客图标 URL（支持 .ico/.png/.svg） |

# 功能列表

### 基础功能
- Markdown 编辑器（editor.md）
- 文章分类、标签
- 永久链接自定义
- Sitemap / robots.txt
- 文章导出 / 导入
- Cloudflare 缓存加速

### 搜索功能
- 导航栏内置搜索框
- 支持标题、正文、标签、分类全文搜索
- API: `GET /api/search?q=关键词`

### 文章密码保护
- 后台编辑文章时可设置访问密码
- 前端自动检测密码保护，显示密码输入弹窗
- 验证通过后 Session 内免重复输入
- API: `POST /api/article/verify-password`

### 评论区功能
- 支持评论和嵌套回复
- 昵称 + 内容，无需注册
- API: `GET /api/comments/{articleId}` / `POST /api/comment/add`

### 附件上传
- 后台编辑器下方提供附件上传面板
- 文件存储在 KV 中（Base64 编码）
- 单文件限制 20MB
- 上传后可一键插入为链接或复制 URL

### 自定义 Favicon
- 后台"设置"页可配置 Favicon URL
- 全站所有页面自动使用配置的图标

# 文件结构

```
cloudflare-workers-blog/
├── index.js                  # Workers 主程序（后端逻辑 + API）
├── themes/
│   └── default2.0/           # 默认主题
│       ├── index.html        # 首页模板
│       ├── article.html      # 文章页模板
│       └── admin/
│           ├── index.html    # 后台主页（新建/设置/发布）
│           └── edit.html     # 文章编辑页
```

# 更新日志

- upd260604: 添加评论区、文章搜索、文章密码保护、附件上传、自定义 Favicon
