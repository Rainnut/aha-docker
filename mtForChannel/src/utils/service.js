import common from '@/utils/common/common.js'
import ios from '@/utils/common/ios.js'
import android from '@/utils/common/android.js'
export default {
  device: function () {
    if (common.device.ios) {
      return ios
    }
    if (common.device.android) {
      return android
    }
  }
}
