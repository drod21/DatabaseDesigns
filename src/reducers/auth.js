export default function auth(state = {}, action) {
  switch(action.type) {
  case 'LOGIN_FULFILLED':
      state = { token: action.token}
      break
  default: break
  }
  return state
}