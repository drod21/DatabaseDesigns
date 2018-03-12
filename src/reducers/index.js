import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import items from './items'
import employees from './employees'
import inventory from './inventory'
import departments from './departments'

import demo from './demo';

const Reducers = combineReducers({
    demo,
    items,
    employees,
    inventory,
    departments,
    routing: routerReducer
});

export default Reducers;
