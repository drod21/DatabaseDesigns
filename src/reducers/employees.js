export default function employees(state = {}, action) {
  switch (action.type) {
    case 'RETRIEVE_EMPLOYEE_FULFILLED':
      state = [ ...state, ...action.employee ]
      break
    case 'RETRIEVE_EMPLOYEES_FULFILLED': 
      state = [ ...state, ...action.employees ]
      break
    default: break
  }

  return state;
}