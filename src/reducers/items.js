export default function items(state=[], action) {
  switch(action.type) {
    case 'RETRIEVE_ALL_ITEMS':
      break;
    case 'RETRIEVE_ALL_ITEMS_FULFILLED':
      state = [ ...action.items ]
      break;
    case 'RETRIEVE_ALL_ITEMS_FAILED': 
      state = { error: action.error }
      break;
    case 'ADD_ITEM':
      state = [ ...state, action.newItem] 
    default: break;
  }
  return state;
}