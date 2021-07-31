// 用于处理ExtractTextPlugin提取出来的资源路径没法设置../image相对路径
class EndWebpackPlugin {
  constructor(options, callback) {
    // this.cssFileList = [];
  }

  apply(compiler) {
    const self = this
    // 源文件的转换和组装已经完成
    compiler.plugin("emit", (compilation, callback) => {
      // 0. 获取所有打包后的文件
      const cssFileList = [];
      compilation.chunks.forEach(chunk => {
        chunk.files.forEach(filename => {
          if (filename.indexOf(".css") > -1) {
            cssFileList.push(filename);
          }
        });
      });

      cssFileList.forEach((filename, index) => {
        let fileStr = compilation.assets[filename].source();
        compilation.assets[filename]._value = fileStr.replace(/url\(\/image\//g, "url(../image/");
      });
      callback();
    })
  }
}
// 导出插件
module.exports = EndWebpackPlugin;
