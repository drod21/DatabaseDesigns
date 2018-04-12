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
      console.log(tempArray)
      tempArray[action.index] = action.item
      console.log('after', tempArray)
      state = tempArray
      break;
    }
    default: break;
  }
  return state;
}