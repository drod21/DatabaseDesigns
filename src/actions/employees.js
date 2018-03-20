import axios from 'axios'

export function getEmployee(id) {
  return {
    type: 'LOGIN_FULFILLED',
    employee: axios.get('/api/employees/' + id)
  }
}