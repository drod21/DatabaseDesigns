import axios from 'axios';

export function getDeptById(id) {
  return {
    type: 'RETRIEVE_DEPT',
    dept: axios.get(`/api/departments/` + id)
  }
}