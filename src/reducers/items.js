export default function items(state=[], action) {
  switch(action.type) {
    case 'RETRIEVE_ALL_ITEMS':
      state = { isLoading: true }  
      break;
    case 'RETRIEVE_ALL_ITEMS_FULFILLED':
      state = [ ...action.items ]
      break;
    case 'RETRIEVE_ALL_ITEMS_FAILED': 
      state = { isLoading: false, error: action.error }
      break;
    default: break;
  }
  return state;
}