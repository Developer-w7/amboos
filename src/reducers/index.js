import { combineReducers } from 'redux';
import { cartItems, items, itemsHaveError, itemsAreLoading } from './cartItems.js';

export default combineReducers({
    cartItems,
    items,
    itemsHaveError,
    itemsAreLoading
});