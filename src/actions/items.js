import axios from 'axios'

export function getItems() {
  return (dispatch) => {
    dispatch({ type: 'RETRIEVE_ALL_ITEMS '});
    axios.get(`/api/items`).then((res) => dispatch({ type: 'RETRIEVE_ALL_ITEMS_FULFILLED', items: res.data }))
    .catch((err) => dispatch({ type: 'RETRIEVE_ALL_ITEMS_FAILED', error: err }))
  }
}

export function addItem(item) {
  return (dispatch) => {
    axios.post('/api/items', { item }).then((res) => {
      dispatch({ type: 'ADD_ITEM_FULFILLED', item: item })
    }).catch((err) => dispatch({ type: 'ADD_ITEM_FAILED', error: err }))
  }
}

export function editItem(item, index) {
  return (dispatch) => {
    axios.put('/api/items', { item }).then((res) => {
      dispatch({ type: 'EDIT_ITEM_FULFILLED', item: item, index: index })
    }).catch((err) => dispatch({ type: 'EDIT_ITEM_FAILED', error: err }))
  }
}

export function searchByKey(key, value) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const deptMap = { 'electronics': 23, 'home goods': 26, 'video games': 21, 'movies': 25 }
      let attribute = value
      if(key === 'department_dept_id') {
        attribute = deptMap[value.toLowerCase()]
      }
      axios.get('/api/item-search/' + key + '/' + attribute).then((res) => {
        dispatch({ type: 'SEARCH_ITEMS_FULFILLED', items: res.data })
        resolve(res.data)
      }).catch((err) => {
        dispatch({ type: 'SEARCH_ITEMS_FAILED', error: err })
        reject(err)
      })
    })
  }
}

export function searchByRange(key, value, op) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get('/api/item-range/' + key + '/' + value + '/' + op).then((res) => {
        dispatch({ type: 'SEARCH_ITEMS_FULFILLED', items: res.data })
        resolve(res.data)
      }).catch((err) => {
        dispatch({ type: 'SEARCH_ITEMS_FAILED', error: err })
        reject(err)
      })
    })
  }
}

export function removeItem(itemId) {
  return (dispatch) => {
    axios.delete('/api/items/' + itemId).then((res) => {
      dispatch({ type: 'REMOVE_ITEM_FULFILLED', items: res.data })
    }).catch((err) => dispatch({ type: 'REMOVE_ITEM_FAILED', error: err }))
  } 
}