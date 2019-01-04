import store from '../store'

export default function (to, fromR, next) {
  if (store.getters.user) {
    next()
  } else {
    next('/login?loginError=true')
  }
}
