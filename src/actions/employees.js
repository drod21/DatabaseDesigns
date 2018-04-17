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

export function addEmployee(employee) {
  return (dispatch) => {
    axios.post('/api/employees', { employee }).then((res) => {
      dispatch({ type: 'ADD_EMPLOYEE_FULFILLED', employees: res.data })
    }).catch((err) => dispatch({ type: 'ADD_EMPLOYEE_FAILED', error: err }))
  }
}

export function editEmployee(employee) {
  return (dispatch) => {
    axios.put('/api/employees', { employee }).then((res) => {
      dispatch({ type: 'EDIT_EMPLOYEE_FULFILLED', employees: res.data })
    }).catch((err) => dispatch({ type: 'EDIT_EMPLOYEE_FAILED', error: err }))
  }
}

export function removeEmployee(empId) {
  return (dispatch) => {
    axios.delete('/api/employees/' + empId).then((res) => {
      dispatch({ type: 'REMOVE_EMPLOYEE_FULFILLED', employees: res.data })
    }).catch((err) => dispatch({ type: 'REMOVE_EMPLOYEE_FAILED', error: err }))
  }
}