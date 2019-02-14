import { combineReducers } from 'redux';
import { cartItems, items, itemsHaveError, itemsAreLoading , profile_Data, order_Data,transaction_Data,currentUser,authUser,wishItems} from './reducers.js';

export default combineReducers({
    cartItems,
    wishItems,
    items,
    itemsHaveError,
    itemsAreLoading,
    profile_Data,
    order_Data,
    transaction_Data,
    currentUser,
    authUser
});