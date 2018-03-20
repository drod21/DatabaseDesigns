import axios from 'axios'

export function getItems() {
  return dispatch => {
    dispatch({ type: 'RETRIEVE_ALL_ITEMS '});
    axios.get(`/api/items`).then((res) => dispatch({ type: 'RETRIEVE_ALL_ITEMS_FULFILLED', items: res.data }))
    .catch((err) => dispatch({ type: 'RETRIEVE_ALL_ITEMS_FAILED', error: err }))
  }
}