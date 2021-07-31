制作镜像
docker build -f Dockerfile ./

```Dockerfile
# why: https://stackoverflow.com/questions/25970711/what-is-the-difference-between-nginx-daemon-on-off-option
# 启动nginx,关闭守护式运行,否则容器启动后会立刻关闭
CMD ["nginx","-g","daemon off;"]
# ？？？
RUN ls -la
```

# Error

## can't cd to

```
 => ERROR [builder 4/4] RUN cd mtForChannel && npm run build                                                                                     0.4s
------
 > [builder 4/4] RUN cd mtForChannel && npm run build:
#12 0.380 /bin/sh: 1: cd: can't cd to mtForChannel
```
