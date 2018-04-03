import axios from 'axios'

export function getItems() {
  return dispatch => {
    dispatch({ type: 'RETRIEVE_ALL_ITEMS '});
    axios.get(`/api/items`).then((res) => dispatch({ type: 'RETRIEVE_ALL_ITEMS_FULFILLED', items: res.data }))
    .catch((err) => dispatch({ type: 'RETRIEVE_ALL_ITEMS_FAILED', error: err }))
  }
}

export function addItem(item) {
  return {
    type: 'ADD_ITEM',
    newItem: axios.post('/api/items/', { item })
  }
}

export function editItem(item) {
  return {
    type: 'ADD_ITEM',
    newItem: axios.put('/api/items/', { item })
  }
}