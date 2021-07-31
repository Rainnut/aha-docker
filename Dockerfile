FROM node:14.16.0 as builder
WORKDIR /app

# 把package.json package-loct.json 复制到app目录下 npm install缓存
# COPY .npmrc* package*.json ./
# RUN npm config set registry http://registry.npm.taobao.org && npm config get registry && npm install
COPY . .
RUN cd mtForChannel && npm run build

FROM nginx:stable-alpine as nginx
#   拷贝配置文件到nginx
COPY --from=builder /app/mtForChannel/dist /usr/share/nginx/html
EXPOSE  80
#   启动nginx,关闭守护式运行,否则容器启动后会立刻关闭
CMD ["nginx","-g","daemon off;"]