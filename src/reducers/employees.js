export default function employees(state = {}, action) {
  switch (action.type) {
    case 'RETRIEVE_EMPLOYEE':
      state = { ...action.employee }
      break
    default: break
  }
  return state;
}