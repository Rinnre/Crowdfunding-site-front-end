import router from './router'
import { Message } from 'element-ui'
import store from '@/store'

router.beforeEach(async (to, from, next) => {
  const user = store.state.user;
  if (user) {
    if (to.path.indexOf('/launch/') > -1 && user.authStatus != 1) {
      Message.error('请先进行用户认证')
      next('')
    }
    next()
  } else {
    if (to.path.indexOf('/user/') > -1 || to.path.indexOf('/launch/') > -1 || to.path.indexOf('/order/') > -1) {
      Message.error('请先登录')
      next('')

    } else {
      next()
    }
  }
})
