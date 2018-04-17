import axios from 'axios'

export function getAllEmployees() {
  return (dispatch) => {
    dispatch({ type: 'RETRIEVE_EMPLOYEES' });
    axios.get('/api/employees').then((res) => dispatch({ type: 'RETRIEVE_EMPLOYEES_FULFILLED', employees: res.data }))
      .catch((err) => dispatch({ type: 'RETRIEVE_EMPLOYEES_FAILED', error: err }))
  }
}

export function getEmployee(id) {
  return {
    type: 'LOGIN_FULFILLED',
    employee: axios.get('/api/employees/' + id)
  }
}