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
    case 'ADD_ITEM_FULFILLED': {
      state = [ ...action.items ]
      break; 
    }
    case 'EDIT_ITEM_FULFILLED': {
      state = [...action.items]
      break;
    }
    case 'REMOVE_ITEM_FULFILLED' : {
      state = [...action.items]
      break;
    }
    default: break;
  }
  return state;
}