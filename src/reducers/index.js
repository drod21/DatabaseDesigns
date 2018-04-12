import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import items from './items'
import employees from './employees'
import managers from './managers'
import departments from './departments'
import auth from './auth'


const Reducers = combineReducers({
    items,
    auth,
    employees,
    managers,
    departments,
    routing: routerReducer
});

export default Reducers;
