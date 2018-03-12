export default function departments(state={}, action) {
  switch(action.type) {
    case 'RETRIEVE_DEPT':
      state = { ...action.dept }
  }
  return state;
}