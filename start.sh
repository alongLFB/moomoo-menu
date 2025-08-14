#!/bin/bash

# Moo Moo Moo 餐厅菜单系统启动脚本

echo "🥢 欢迎使用 Moo Moo Moo 餐厅菜单系统"
echo "================================="

# 检查 Node.js 版本
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 请先安装 Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ 错误: 需要 Node.js 18+，当前版本: $(node --version)"
    exit 1
fi

echo "✅ Node.js 版本检查通过: $(node --version)"

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖中..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装完成"
fi

# 检查环境变量
if [ ! -f ".env.local" ]; then
    echo "⚙️  创建环境配置文件..."
    cp .env.example .env.local
    echo "📝 请编辑 .env.local 文件并填入正确的配置"
    echo "   - Cloudflare D1 数据库配置"
    echo "   - Cloudflare R2 存储配置"
    read -p "配置完成后按回车继续..."
fi

# 类型检查
echo "🔍 进行类型检查..."
npm run type-check
if [ $? -ne 0 ]; then
    echo "⚠️  类型检查发现问题，但继续运行..."
fi

# 启动开发服务器
echo "🚀 启动开发服务器..."
echo "   地址: http://localhost:3000"
echo "   按 Ctrl+C 停止服务器"
echo ""

npm run dev
