# 修复后的 Dockerfile

# 1. Build Stage
FROM node:22-alpine3.20 AS builder
WORKDIR /app

# 添加源代码
ADD . /app


RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

# 2. Serve Stage
FROM nginx AS serve
WORKDIR /usr/share/nginx/html

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 添加自定义 Nginx 配置
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/fe.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动服务
CMD ["nginx", "-g", "daemon off;"]
