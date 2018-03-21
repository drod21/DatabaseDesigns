import axios from 'axios'

export function login(email, password) {
  return dispatch => {
    dispatch({ type: 'LOGIN ' });
    axios.put('/api/login', { email, password }).then((res) => {
      dispatch({ type: 'LOGIN_FULFILLED', employee: res.data }
    )})
    .catch((err) => dispatch({ type: 'LOGIN_FAILED', error: err }))
  }
}


