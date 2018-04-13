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
    case 'ADD_ITEM': {
      const tempArray = state

      tempArray.push(action.item)
      state = tempArray
      break; 
    }
    case 'EDIT_ITEM_FULFILLED': {
      const tempArray = state      
      tempArray[action.index] = action.item
      state = tempArray
      break;
    }
    case 'REMOVE_ITEM_FULFILLED' : {
      console.log(action)
      const tempArray = action.items
      state = tempArray
      console.log(state)
      break;
    }
    default: break;
  }
  return state;
}