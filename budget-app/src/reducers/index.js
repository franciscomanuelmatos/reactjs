import { combineReducers } from 'redux';

import expenses from './expenses';
import filters from './filters';

export default combineReducers({
    expenses,
    filters
});
