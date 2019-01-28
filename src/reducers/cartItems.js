export function cartItems(state = [], action) {
    switch (action.type) {
        case 'ADD_TO_CART':

            return [...state, action.payload];

        case 'DROP_ITEM_FROM_CART':
            const index = state.findIndex(cartItem => cartItem.product_id === action.payload.product_id);
            
            return state.filter((_, i) => i !== index);
        case 'REMOVE_FROM_CART':
            return state.filter(cartItem => cartItem.product_id !== action.payload.product_id)
    }

    return state
}

export function itemsHaveError(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAVE_ERROR':
            return action.hasError;

        default:
            return state;
    }
}

export function itemsAreLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_ARE_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}


export function items(state = false, action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.token;

        default:
            return state;
    }
}