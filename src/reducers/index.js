import { combineReducers } from 'redux';
import { cartItems, items, itemsHaveError, itemsAreLoading , profile_Data, order_Data,transaction_Data} from './cartItems.js';

export default combineReducers({
    cartItems,
    items,
    itemsHaveError,
    itemsAreLoading,
    profile_Data,
    order_Data,
    transaction_Data
});