export default function employees(state = {}, action) {
  switch (action.type) {
    case 'RETRIEVE_EMPLOYEE_FULFILLED':
      state = [ ...state, ...action.employee ]
      break
    case 'RETRIEVE_EMPLOYEES_FULFILLED': 
      state = action.employees
      break
    case 'ADD_EMPLOYEE_FULFILLED': {
      state = [ ...action.employees ]
      break;
    }
    case 'EDIT_EMPLOYEE_FULFILLED': {
      state = [ ...action.employees ]
      break;
    }
    case 'REMOVE_EMPLOYEE_FULFILLED': {
      state = [ ...action.employees ]
      break;
    }
    default: break
  }

  return state;
}