# Moo Moo Moo Restaurant Menu System 🥢

现代化饭店菜单展示系统 - 为 Moo Moo Moo 餐厅打造的在线菜单平台

## 🌟 Features

- 📱 **响应式设计** - 完美适配手机、平板和桌面设备
- 🌍 **多语言支持** - 中文/英文双语切换
- 🛒 **购物车功能** - 本地存储，无需登录
- 🔍 **智能搜索** - 支持中英文模糊搜索
- 🏷️ **筛选分类** - 按分类和价格范围筛选
- 🌙 **深色模式** - 支持浅色/深色主题切换
- ⚡ **高性能** - 使用 Next.js 15 和 Edge Runtime
- 🎨 **优雅动画** - Framer Motion 提供流畅交互体验

## 🛠️ Tech Stack

- **前端**: Next.js 15.4.6 (App Router) + React 19
- **样式**: Tailwind CSS + Framer Motion
- **数据库**: Cloudflare D1 (SQLite)
- **ORM**: Drizzle ORM
- **对象存储**: Cloudflare R2
- **国际化**: next-intl
- **部署**: Vercel
- **语言**: TypeScript

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Cloudflare 账户 (用于 D1 数据库和 R2 存储)

### Installation

1. **克隆项目**
```bash
git clone <repository-url>
cd moomoo-menu
```

2. **安装依赖**
```bash
npm install
```

3. **环境配置**
```bash
cp .env.example .env.local
```

编辑 `.env.local` 并填入你的配置：
```env
CLOUDFLARE_DATABASE_ID=your_d1_database_id
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY_ID=your_r2_access_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_r2_secret_key
CLOUDFLARE_R2_BUCKET=moomoo-menu-assets
CLOUDFLARE_R2_PUBLIC_URL=https://moomoo-menu-assets.r2.dev
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **数据库设置**
```bash
# 生成数据库迁移
npm run db:generate

# 运行迁移
npm run db:migrate
```

5. **启动开发服务器**
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 国际化路由
│   │   ├── page.tsx       # 首页
│   │   └── about/         # 关于页面
│   ├── api/               # API 路由
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── navbar.tsx         # 导航栏
│   ├── dish-card.tsx      # 菜品卡片
│   ├── cart-drawer.tsx    # 购物车抽屉
│   └── ...
├── contexts/              # React 上下文
│   ├── cart-context.tsx   # 购物车状态
│   └── theme-context.tsx  # 主题状态
├── lib/                   # 工具库
│   └── db/                # 数据库配置
├── types/                 # TypeScript 类型定义
└── middleware.ts          # Next.js 中间件
```

## 🗃️ Database Schema

### Categories (分类)
- `id` - 主键
- `name_zh` - 中文名称
- `name_en` - 英文名称
- `slug` - URL 友好的标识符
- `sort_order` - 排序顺序

### Dishes (菜品)
- `id` - 主键
- `category_id` - 分类外键
- `name_zh/name_en` - 中英文名称
- `description_zh/description_en` - 中英文描述
- `price` - 价格 (AED)
- `image_thumbnail/image_full` - 缩略图/高清图片
- `ingredients_zh/ingredients_en` - 中英文食材列表
- `allergens_zh/allergens_en` - 中英文过敏源信息
- `tags` - JSON 格式的标签 (招牌菜、辣度等)
- `is_featured` - 是否为招牌菜
- `is_available` - 是否可用
- `prep_time` - 制作时间 (分钟)

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/categories` | 获取所有分类 |
| GET | `/api/v1/dishes` | 获取菜品列表 (支持搜索/筛选) |
| GET | `/api/v1/dishes/[id]` | 获取单个菜品详情 |
| POST | `/api/v1/orders/preview` | 生成订单摘要 |

### 查询参数

**`/api/v1/dishes`**
- `q` - 搜索关键词
- `cat` - 分类 ID
- `priceMin/priceMax` - 价格范围
- `page/limit` - 分页参数

## 🎨 Customization

### 主题配置
在 `tailwind.config.ts` 中自定义颜色主题：

```typescript
theme: {
  extend: {
    colors: {
      primary: "your-primary-color",
      // ... 其他颜色
    }
  }
}
```

### 语言配置
在 `messages/` 目录下编辑语言文件：
- `zh.json` - 中文翻译
- `en.json` - 英文翻译

## 📦 Deployment

### Vercel 部署

1. **连接 GitHub**
   - Fork 此项目到你的 GitHub
   - 在 Vercel 中导入项目

2. **环境变量**
   - 在 Vercel 项目设置中添加所有环境变量

3. **部署**
   - Vercel 会自动构建和部署

### Cloudflare 配置

1. **D1 数据库**
```bash
wrangler d1 create moomoo-menu-db
wrangler d1 execute moomoo-menu-db --file=./drizzle/202508131200_init.sql
```

2. **R2 存储桶**
```bash
wrangler r2 bucket create moomoo-menu-assets
```

## 📊 Performance

- ⚡ Lighthouse Score: 90+
- 🚀 Core Web Vitals优化
- 📱 移动端友好
- 🖼️ 图片自动优化 (WebP)
- 💾 智能缓存策略

## 🔧 Development

### 可用脚本

```bash
npm run dev          # 开发模式
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 代码检查
npm run type-check   # TypeScript 类型检查
npm run db:generate  # 生成数据库迁移
npm run db:migrate   # 运行数据库迁移
npm run db:studio    # 启动数据库可视化工具
```

### 代码规范

项目使用以下工具确保代码质量：
- **ESLint** - JavaScript/TypeScript 代码检查
- **Prettier** - 代码格式化
- **TypeScript** - 类型安全

## 📞 Contact

**餐厅信息**
- 📍 地址: Electra Abdullah Bin Humaid Al Rumaithi St - Al Danah - Zone 1 - Abu Dhabi
- 📞 电话: +971 056 496 6886
- 👨‍💼 联系人: 姜老板
- 🕒 营业时间: 11:00-14:00 / 17:00-22:00

## 📄 License

MIT License - 详见 [LICENSE](LICENSE) 文件

---

Built with ❤️ by the Moo Moo Moo team
