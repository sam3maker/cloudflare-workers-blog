> 这是一个运行在 Cloudflare Workers 上的博客程序，使用 Cloudflare KV 作为数据库，附件存储支持 TiDB Cloud。
> 兼容静态博客的速度，以及动态博客的灵活性，方便搭建不折腾，很稳定。

### 讨论群: [@cf-workers-blog](https://discord.gg/mKCvScsW5e)

# 主要特点
* 使用 Workers 提供的 KV 作为数据库（文章、评论）
* 使用 TiDB Cloud Serverless 存储附件（二进制文件）
* 使用 Cloudflare 缓存 HTML 来降低 KV 的读写
* 所有 HTML 页面均为缓存，可达到静态博客的速度
* 使用 KV 作为数据库，可达到 WordPress 的灵活性
* 后台使用 Markdown 语法，方便快捷
* 一键发布（页面重构 + 缓存清理）

# 承载能力
* KV 基本不存在瓶颈，因为使用了缓存，读写很少
* 唯一瓶颈是 Workers 的日访问量 10w，大约能承受2万IP /日
* 文章数：1G 存储空间，几万篇问题不大
* TiDB Cloud Serverless 免费额度：50M Request Units/月，5GB 存储

# 部署步骤
1. Fork 本仓库
2. 在 Cloudflare Dashboard 创建两个 KV Namespace
3. 创建一个 Worker，将 `index.js` 的内容粘贴进去
4. 在 Worker 设置中绑定 KV Namespace：
   - 变量名 `CFBLOG`（用于文章数据）
   - 变量名 `CFCOMMENT`（用于评论数据）
5. 在 [TiDB Cloud](https://tidbcloud.com) 创建 Serverless 实例和数据库
6. 在 TiDB Cloud SQL Console 中执行建表语句：
   ```sql
   ALTER TABLE uploads ADD COLUMN article_id VARCHAR(10) DEFAULT NULL;
   ```
   （如 uploads 表不存在，请先创建）
7. 在 Worker 设置中添加环境变量（Secret）：
   - `TIDB_DATABASE_URL`：格式 `mysql://用户名:密码@host/数据库名`
     - 从 TiDB Cloud 控制台 Connect 页面获取
     - 选择 Serverless Driver 连接方式
8. 修改 `index.js` 头部的 `OPT` 配置项（站点名、域名、密码等）
9. 绑定自定义域名或使用 Workers 自带域名
10. 访问 `https://你的域名/admin/` 进入后台

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

# 环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `CFBLOG` | KV Namespace 绑定（文章数据） | KV binding |
| `CFCOMMENT` | KV Namespace 绑定（评论数据） | KV binding |
| `TIDB_DATABASE_URL` | TiDB Cloud 连接串（Secret） | `mysql://user.root:pass@gateway01.xxx.tidbcloud.com/openblog` |

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
- 自动兼容旧数据，补全评论 ID
- API: `GET /api/comments/{articleId}` / `POST /api/comment/add`

### 附件管理（TiDB Cloud）
- 后台编辑器下方提供附件上传面板
- 文件存储在 TiDB Cloud（Serverless HTTP API，无需 TCP/.pem）
- 上传时自动关联当前文章
- 编辑页面自动加载已有附件列表
- 支持附件删除
- 文章页底部自动展示附件下载按钮
- 单文件限制 20MB
- 上传后可一键插入为图片/链接或复制 URL
- API:
  - `POST /admin/upload`（上传，需 admin 鉴权）
  - `POST /admin/upload/delete`（删除，需 admin 鉴权）
  - `GET /api/attachments/{articleId}`（查询附件列表）
  - `GET /admin/file/FILE_{id}`（下载附件）

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
│       ├── article.html      # 文章页模板（含附件下载区）
│       └── admin/
│           ├── index.html    # 后台主页（新建/设置/发布）
│           └── edit.html     # 文章编辑页（含附件管理）
```

# 架构说明

```
用户请求 → Cloudflare Workers (index.js)
              ├── KV (CFBLOG)     → 文章/配置数据
              ├── KV (CFCOMMENT)  → 评论数据
              └── TiDB Cloud HTTP → 附件存储（uploads 表）
              └── Cloudflare Cache → HTML 页面缓存
```

# 更新日志

- upd260606: 附件存储从 KV 迁移至 TiDB Cloud，新增附件删除、文章页附件下载展示
- upd260604: 添加评论区、文章搜索、文章密码保护、附件上传、自定义 Favicon
