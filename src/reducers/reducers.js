const initialState={
    token:'',
    loading:true,
    error: null,
    loggedIn:false,
    loggedUser:{}
}
export function cartItems(state = [], action) {
    switch (action.type) {
        case 'ADD_TO_CART':

            return [...state, action.payload];

        case 'DROP_ITEM_FROM_CART':
            const index = state.findIndex(cartItem => cartItem.product_id === action.payload.product_id);
            
            return state.filter((_, i) => i !== index);
        case 'REMOVE_FROM_CART':
            return state.filter(cartItem => cartItem.product_id !== action.payload.product_id)
            case 'GET_CARTLIST':
            return state=action.payload;
    }

    return state
}
export function wishItems(state = [], action) {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':

            return [...state, action.payload];

        
        case 'CLEAR_Wish_LIST':
            return state=[];

            case 'GET_WISHLIST':
            return state=action.payload;
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

export function profile_Data(state = [], action) {
    switch (action.type) {
        case 'GET_PROFILE_DETAILS':
            return action.payload;

        default:
            return state;
    }
}

export function order_Data(state = [], action) {
    switch (action.type) {
        case 'GET_ORDER_DETAILS':
            return action.payload;

        default:
            return state;
    }
}

export function transaction_Data(state = [], action) {
    switch (action.type) {
        case 'GET_TRANSACTION_DETAILS':
            return action.payload;

        default:
            return state;
    }
}
export function currentUser(state={logged_user:'arun'}, action) {
    switch (action.type) {
        case 'CURRENT_USER':
            return { ...state, logged_user:action.payload };

        default:
            return state;
    }
}


export function authUser(state=initialState,action){
    switch (action.type) {
        case 'GET_TOKEN':
            return { ...state, token: action.token };
        case 'SAVE_TOKEN':
            return { ...state, token:action.token};
        case 'REMOVE_TOKEN':
            return { ...state, token: action.token };
        case 'LOADING':
            return { ...state, loading: action.isLoading };
        case 'ERROR':
            return { ...state, error: action.error };
        case 'LOGGED_IN':
            return { ...state,loggedIn:action.loggedIn };
        case 'LOGGED_USER':
            return { ...state,loggedUser:action.user };
        default:
            return state;
    }
}