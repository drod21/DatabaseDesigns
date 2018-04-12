export default function items(state=[], action) {
  switch(action.type) {
    case 'RETRIEVE_ALL_ITEMS':
      break;
    case 'RETRIEVE_ALL_ITEMS_FULFILLED':
      state = [ ...action.items ]
      break;
    case 'SEARCH_ITEMS_FULFILLED':
      state = [ ...action.items ]
      break;
    case 'RETRIEVE_ALL_ITEMS_FAILED': 
      state = { error: action.error }
      break;
    case 'ADD_ITEM':
      state = [ ...state, action.newItem] 
    case 'EDIT_ITEM':
      state = [...state, ...action.items]
    default: break;
  }
  return state;
}