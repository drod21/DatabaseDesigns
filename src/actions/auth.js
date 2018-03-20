import axios from 'axios'

export function login(email, password) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: 'LOGIN' });
      axios.put('/api/login', { email, password }).then((res) => {
        dispatch({ type: 'LOGIN_FULFILLED', token: res.data.token })
       }).catch((err) => dispatch({ type: 'LOGIN_FAILED', error: err }))
    })
  }
}