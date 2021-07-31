# data-admin

服务器构建+服务器集群

```Dockerfile
FROM node:14.16.0 as builder
WORKDIR /app

# 把package.json package-loct.json 复制到app目录下 npm install缓存
COPY .npmrc* package*.json ./
# RUN npm config set registry http://registry.npm.taobao.org && npm config get registry && npm install
RUN  npm install
COPY . .
RUN npm run build:prod

FROM nginx:stable-alpine as nginx
# 拷贝配置文件到nginx
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE  80
# 启动nginx,关闭守护式运行,否则容器启动后会立刻关闭
CMD ["nginx","-g","daemon off;"]
```

# hero-37mobile

容器构建+容器部署

```Dockerfile
FROM node:latest as builder

WORKDIR /app
COPY . .
# RUN yarn config set registry https://registry.npm.taobao.org
# 金文改本地打包，spider需要海外单独一套的原因
# RUN cd heroestoles && yarn bootstrap && yarn build

FROM nginx:stable-alpine as nginx
#   拷贝配置文件到nginx
COPY --from=builder /app/heroestoles/dist /usr/share/nginx/html
EXPOSE  80
#   启动nginx,关闭守护式运行,否则容器启动后会立刻关闭
CMD ["nginx","-g","daemon off;"]
```
