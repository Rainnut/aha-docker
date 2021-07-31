function ReportSender (ops, typeStr) {
  console.log('window.heytap', window.heytap)
}
ReportSender.prototype.send = function send (moduleName, eventName, type, label) {
  if (window.heytap) {
    window.heytap.stats(type, eventName)
    console.log(`上报自定义参数成功! 自定义参数:${type}, ${eventName}`)
  }
}
export default ReportSender
