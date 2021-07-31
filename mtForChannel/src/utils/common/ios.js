module.exports = {
  close: function () {
    window.location.href = 'helpClose://0'
  },
  exchange: function () {
    window.location.href = 'changeaccount://nothing'
  },
  paySwitch: function () {
    window.location.href = 'payswitch://nothing'
  },
  modifyPass: function () {
    window.location.href = 'modifyPass://nothing'
  },
  openHelp: function () {
    window.location.href = 'helpopen://'
  }
}
